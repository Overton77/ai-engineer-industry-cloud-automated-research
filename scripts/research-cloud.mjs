import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { basename, dirname, extname, relative, resolve, sep } from "node:path";
import process from "node:process";
import pg from "pg";
import { createClient } from "@supabase/supabase-js";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const { Pool } = pg;
const ROOT = resolve(import.meta.dirname, "..");
const BUCKET = "ai-engineer-cloud-bucket";
const TRANSCRIPT_BUCKET = "ai-engineer-transcripts";
const RUNS_ROOT = resolve(ROOT, "artifacts/runs");
const args = process.argv.slice(2);
const command = args.shift();
const subcommand = args[0]?.startsWith("--") ? null : args.shift();

function flag(name, fallback = undefined) {
  const equal = args.find((value) => value.startsWith(`${name}=`));
  if (equal) return equal.slice(name.length + 1);
  const index = args.indexOf(name);
  return index >= 0 ? (args[index + 1]?.startsWith("--") ? true : (args[index + 1] ?? true)) : fallback;
}
function has(name) { return args.includes(name) || args.some((value) => value === `${name}=true`); }
function required(name) { const value = flag(name); if (!value || value === true) throw new Error(`${name} is required`); return value; }
function loadEnvironment() {
  const path = process.env.AI_ENGINEER_ENV_FILE ?? resolve(ROOT, ".env");
  if (existsSync(path) && typeof process.loadEnvFile === "function") process.loadEnvFile(path);
}
function dbPool() {
  const configured = process.env.POSTGRES_URL_NON_POOLING ?? process.env.POSTGRES_URL;
  if (!configured) throw new Error("POSTGRES_URL_NON_POOLING or POSTGRES_URL is required");
  let connectionString = configured;
  let ssl;
  const rootCertificate = process.env.POSTGRES_SSL_ROOT_CERT?.replaceAll("\\n", "\n");
  const sslMode = process.env.POSTGRES_SSL_MODE;
  if (rootCertificate || sslMode === "no-verify" || sslMode === "disable") {
    const parsed = new URL(configured);
    parsed.searchParams.delete("sslmode");
    connectionString = parsed.toString();
    ssl = sslMode === "disable" ? false : (rootCertificate ? { ca: rootCertificate, rejectUnauthorized: true } : { rejectUnauthorized: false });
  }
  return new Pool({ connectionString, ssl, max: 4, statement_timeout: 30_000, application_name: "ai-engineer-cloud-research" });
}
function storageClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("SUPABASE_URL and SUPABASE_SECRET_KEY (or legacy SUPABASE_SERVICE_ROLE_KEY) are required");
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === "object") return Object.fromEntries(Object.keys(value).sort().map((key) => [key, stable(value[key])]));
  return value;
}
function canonicalJson(value) { return `${JSON.stringify(stable(value), null, 2)}\n`; }
function sha256(bytes) { return createHash("sha256").update(bytes).digest("hex"); }
function output(value) { process.stdout.write(`${JSON.stringify(value, null, 2)}\n`); }
function outputOrWrite(value, metadata = {}) {
  const outputPath = flag("--output");
  if (!outputPath) return output(value);
  const resolvedPath = resolve(String(outputPath));
  if (existsSync(resolvedPath) && !has("--overwrite")) throw new Error(`Output already exists: ${resolvedPath}; use --overwrite to replace it`);
  const bytes = Buffer.from(canonicalJson(value));
  mkdirSync(dirname(resolvedPath), { recursive:true });
  writeFileSync(resolvedPath, bytes);
  output({ ok:true,output:resolvedPath,bytes:bytes.length,sha256:sha256(bytes),...metadata });
}
function assertApply() { if (!has("--apply")) throw new Error("Mutation refused: rerun with --apply after reviewing the plan"); }
function quoteIdent(value) { if (!/^[a-z][a-z0-9_]*$/.test(value)) throw new Error(`Unsafe identifier: ${value}`); return `"${value}"`; }
function positiveInteger(name, fallback, maximum) {
  const value = Number(flag(name, String(fallback)));
  if (!Number.isInteger(value) || value <= 0 || value > maximum) throw new Error(`${name} must be an integer from 1 to ${maximum}`);
  return value;
}
function jsonFile(name, fallback = {}) {
  const path = flag(name);
  return path ? JSON.parse(readFileSync(resolve(String(path)), "utf8")) : fallback;
}
function safeSegment(value) { return String(value).toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "") || "unnamed"; }
function mediaType(path) {
  return ({ ".json":"application/json", ".jsonl":"application/x-ndjson", ".md":"text/markdown", ".txt":"text/plain", ".csv":"text/csv", ".html":"text/html", ".xml":"application/xml", ".pdf":"application/pdf", ".png":"image/png", ".jpg":"image/jpeg", ".jpeg":"image/jpeg", ".webp":"image/webp" })[extname(path).toLowerCase()] ?? "application/octet-stream";
}
function filesUnder(root) {
  const out = [];
  function visit(path) {
    for (const entry of readdirSync(path, { withFileTypes:true }).sort((a,b) => a.name.localeCompare(b.name))) {
      const full = resolve(path, entry.name);
      if (entry.isSymbolicLink()) throw new Error(`Symlinks are not archived: ${full}`);
      if (entry.isDirectory()) visit(full);
      else if (entry.isFile()) out.push(full);
    }
  }
  visit(root); return out;
}
function isDuplicateStorageError(error) { return Number(error?.statusCode ?? error?.status) === 409 || /duplicate|already exists/i.test(String(error?.message)); }
async function uploadImmutable(supabase, bucket, objectPath, bytes, contentType, expectedHash = sha256(bytes)) {
  const { error } = await supabase.storage.from(bucket).upload(objectPath, bytes, { contentType, upsert:false });
  if (!error) return;
  if (!isDuplicateStorageError(error)) throw error;
  const existing = await supabase.storage.from(bucket).download(objectPath);
  if (existing.error) throw existing.error;
  const existingBytes = Buffer.from(await existing.data.arrayBuffer());
  if (sha256(existingBytes) !== expectedHash) throw new Error(`Storage collision at ${bucket}/${objectPath}`);
}
async function registerArtifact(client, { artifactType, hash, bucketClass, objectPath, media, size, attemptId = null, missionId = null }) {
  const inserted = await client.query(`insert into orchestration.artifact
    (artifact_type,sha256,bucket_class,storage_bucket,object_path,media_type,size_bytes,producer_attempt_id,mission_id)
    values($1,$2,$3,$4,$5,$6,$7,$8,$9) on conflict(storage_bucket,object_path) do nothing returning *`,
    [artifactType,hash,bucketClass,BUCKET,objectPath,media,size,attemptId,missionId]);
  const artifact = inserted.rows[0] ?? (await client.query(`select * from orchestration.artifact where storage_bucket=$1 and object_path=$2`,[BUCKET,objectPath])).rows[0];
  if (!artifact || artifact.sha256 !== hash || artifact.artifact_type !== artifactType || artifact.producer_attempt_id !== attemptId || artifact.mission_id !== missionId) {
    throw new Error(`Artifact registry collision at ${BUCKET}/${objectPath}`);
  }
  return artifact;
}
function missionScope() {
  const scopes = [["id",flag("--mission-id")],["slug",flag("--mission-slug")],["video",flag("--video-id")]].filter(([,value]) => value && value !== true);
  if (scopes.length !== 1) throw new Error("Exactly one of --mission-id, --mission-slug, or --video-id is required");
  const [kind,value] = scopes[0]; return { kind, value:String(value), slug:kind === "video" ? `ai-engineer-video:${value}` : null };
}
async function resolveMission(client, scope = missionScope()) {
  const query = scope.kind === "id"
    ? ["select * from orchestration.mission where id=$1", scope.value]
    : ["select * from orchestration.mission where slug=$1", scope.slug ?? scope.value];
  const mission = (await client.query(query[0],[query[1]])).rows[0];
  if (!mission) throw new Error(`Mission not found for ${scope.kind}=${scope.value}`);
  return mission;
}
async function attemptScope(client, mission, workItemId, attemptId) {
  const row = (await client.query(`select a.id,a.attempt_no,a.work_item_id,w.mission_id,w.kind,w.lease_owner,w.status
    from orchestration.attempt a join orchestration.work_item w on w.id=a.work_item_id
    where a.id=$1 and w.id=$2 and w.mission_id=$3`,[attemptId,workItemId,mission.id])).rows[0];
  if (!row) throw new Error("Attempt, work item, and mission do not belong to the same scope");
  return row;
}
function attemptPrefix(mission, workItemId, attempt) {
  return `missions/${safeSegment(mission.slug ?? mission.id)}/${mission.id}/work-items/${workItemId}/attempts/${String(attempt.attempt_no).padStart(3,"0")}-${attempt.id}`;
}

const MUTABLE_TABLES = new Set([
  "corpus.organization", "corpus.organization_identifier", "corpus.person", "corpus.person_identifier",
  "corpus.repository", "corpus.repository_alias", "corpus.library", "corpus.paper", "corpus.video",
  "corpus.talk", "corpus.product", "corpus.concept", "corpus.dataset", "corpus.benchmark",
  "corpus.ai_model", "corpus.ai_model_version", "corpus.ai_protocol", "corpus.ai_protocol_version",
  "corpus.mcp_server", "corpus.agent_skill", "corpus.case_study",
  "corpus.product_family", "corpus.product_family_member", "corpus.product_version", "corpus.product_feature",
  "corpus.organization_relationship", "corpus.organization_product_relationship",
  "corpus.repository_maintained_by_organization", "corpus.product_backed_by_repository",
  "corpus.paper_introduces_model", "corpus.ai_model_relationship", "corpus.ai_protocol_relationship",
  "corpus.benchmark_evaluates_model_version", "corpus.benchmark_uses_dataset",
  "corpus.case_study_uses_model_version", "corpus.case_study_uses_library", "corpus.case_study_references_benchmark",
  "staging.candidate", "staging.candidate_library", "staging.candidate_repository", "staging.candidate_person",
  "staging.candidate_organization", "staging.candidate_paper", "staging.candidate_video", "staging.candidate_talk",
  "staging.candidate_product", "staging.candidate_concept", "staging.candidate_dataset", "staging.candidate_benchmark",
  "staging.candidate_ai_model", "staging.candidate_case_study", "staging.mention", "staging.identity_match",
  "staging.resolution_decision", "staging.vetting_decision", "evidence.source", "evidence.source_capture",
  "evidence.locator", "evidence.extraction_signature", "evidence.claim", "evidence.claim_evidence_link",
  "evidence.claim_evidence_assessment",
  "evidence.claim_library", "evidence.claim_repository", "evidence.claim_person", "evidence.claim_organization",
  "evidence.claim_paper", "evidence.claim_talk", "evidence.claim_video", "evidence.claim_product",
  "evidence.claim_product_version",
  "evidence.claim_dataset", "evidence.claim_benchmark", "evidence.claim_case_study",
  "ranking.metric_definition", "ranking.metric_definition_version", "ranking.metric_observation",
  "research.research_bundle", "research.bundle_artifact", "research.report", "research.report_version",
  "research.report_claim", "research.finding", "taxonomy.assignment"
]);

function validateIntentDocument(document) {
  const schema = JSON.parse(readFileSync(resolve(ROOT, "contracts/ingestion-intent.schema.json"), "utf8"));
  const ajv = new Ajv2020({ allErrors: true, strict: true });
  addFormats(ajv);
  const validate = ajv.compile(schema);
  if (!validate(document)) throw new Error(`Invalid intent:\n${JSON.stringify(validate.errors, null, 2)}`);
  const ids = new Set();
  for (const operation of document.payload.operations) {
    if (ids.has(operation.id)) throw new Error(`Duplicate operation id: ${operation.id}`);
    ids.add(operation.id);
    if (!MUTABLE_TABLES.has(operation.target)) throw new Error(`Target is not executable: ${operation.target}`);
  }
  return document;
}
function resolveRefs(value, results) {
  if (Array.isArray(value)) return value.map((item) => resolveRefs(item, results));
  if (value && typeof value === "object") {
    if (Object.keys(value).length === 1 && typeof value.$ref === "string") {
      const [operationId, field] = value.$ref.split(".");
      if (!results[operationId] || !(field in results[operationId])) throw new Error(`Unresolved reference: ${value.$ref}`);
      return results[operationId][field];
    }
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, resolveRefs(item, results)]));
  }
  return value;
}

async function verify() {
  const pool = dbPool();
  const supabase = storageClient();
  try {
    const { rows: [row] } = await pool.query(`select
      to_regclass('orchestration.work_item_event') is not null as progress_ledger,
      to_regclass('evidence.source_query') is not null
        and to_regclass('evidence.source_retrieval') is not null
        and to_regclass('evidence.source_support') is not null as source_intelligence,
      to_regclass('corpus.case_study') is not null as case_studies,
      to_regclass('corpus.product_family') is not null
        and to_regclass('corpus.product_version') is not null
        and to_regclass('corpus.product_feature') is not null
        and to_regclass('corpus.organization_product_relationship') is not null
        and to_regclass('corpus.ai_model_relationship') is not null
        and to_regclass('corpus.ai_protocol_relationship') is not null
        and to_regclass('corpus.benchmark_evaluates_model_version') is not null
        and to_regclass('corpus.case_study_uses_model_version') is not null as entity_relationship_graph,
      to_regclass('taxonomy.entity_kind') is not null
        and to_regclass('taxonomy.term_target_kind') is not null
        and (select count(*) from taxonomy.facet where slug in
          ('entity_subtype','modality','access_model','deployment_model','organization_sector'))=5
        and (select count(*) from information_schema.columns where table_schema='taxonomy'
          and table_name='assignment' and column_name in ('dataset_id','benchmark_id'))=2 as entity_taxonomy,
      to_regclass('evidence.claim_product_version') is not null
        and to_regclass('evidence.claim_evidence_assessment') is not null
        and (select is_nullable='NO' from information_schema.columns where table_schema='evidence'
          and table_name='claim' and column_name='producer_attempt_id')
        and (select is_nullable='NO' from information_schema.columns where table_schema='evidence'
          and table_name='locator' and column_name='selected_content_sha256')
        and exists (select 1 from information_schema.triggers where trigger_schema='evidence'
          and event_object_table='claim' and trigger_name='claim_verified_gate')
        and exists (select 1 from information_schema.triggers where trigger_schema='evidence'
          and event_object_table='claim' and trigger_name='claim_content_provenance_immutable')
        and exists (select 1 from information_schema.triggers where trigger_schema='evidence'
          and event_object_table='verification_finding' and trigger_name='verification_finding_immutable')
        and exists (select 1 from information_schema.triggers where trigger_schema='evidence'
          and event_object_table='verification_run' and trigger_name='verification_run_identity_immutable')
        and exists (select 1 from information_schema.triggers where trigger_schema='orchestration'
          and event_object_table='attempt' and trigger_name='attempt_identity_immutable')
        and (select count(distinct event_object_table) from information_schema.triggers where trigger_schema='evidence'
          and trigger_name='claim_entity_association_immutable')=18
        and (select count(distinct event_object_table) from information_schema.triggers where trigger_schema='evidence'
          and trigger_name='claim_entity_association_proposed')=18
        as claim_verification_contract,
      (select count(*) from information_schema.columns where table_schema='ranking' and table_name='metric_observation'
        and column_name in ('dataset_id','benchmark_id','talk_id','ai_model_id','case_study_id')) = 5 as metric_targets,
      (select count(*) from information_schema.columns where table_schema='ranking' and table_name='metric_observation'
        and column_name in ('collected_at','dimensions','raw_capture_id','quality_flags','unavailable_reason')) = 5 as metric_provenance`);
    const { data: buckets, error } = await supabase.storage.listBuckets();
    if (error) throw error;
    const artifactBucket = buckets.find((item) => item.id === BUCKET);
    const transcriptBucket = buckets.find((item) => item.id === TRANSCRIPT_BUCKET);
    const storage = {
      artifacts: { bucket:BUCKET, exists:Boolean(artifactBucket), private:artifactBucket ? !artifactBucket.public : null },
      transcripts: { bucket:TRANSCRIPT_BUCKET, exists:Boolean(transcriptBucket), private:transcriptBucket ? !transcriptBucket.public : null }
    };
    output({ ok:Object.values(row).every(Boolean) && artifactBucket?.public === false && transcriptBucket?.public === false, database:row, storage });
  } finally { await pool.end(); }
}

async function schemaWorkspace() {
  if (subcommand === "snapshot") process.stderr.write("schema snapshot now generates the v2 drill-down workspace; prefer schema workspace.\n");
  const result = spawnSync(process.execPath, [resolve(ROOT, "scripts/build-schema-workspace.mjs")], {
    cwd: ROOT,
    env: process.env,
    encoding: "utf8",
  });
  if (result.stdout) process.stdout.write(result.stdout);
  if (result.status !== 0) throw new Error(result.stderr || "Schema workspace generation failed");
}

async function videosList() {
  const pool = dbPool();
  const order = flag("--order", "asc");
  if (!["asc","desc"].includes(order)) throw new Error("--order must be asc or desc");
  const limit = Math.min(Number(flag("--limit", "2000")), 5000);
  try {
    const filters=[];
    if(has("--eligible")) filters.push(`v.transcript_status='stored' and v.transcript_bucket='ai-engineer-transcripts' and v.transcript_path is not null and v.duration_seconds>0 and v.duration_seconds<5400`);
    if(has("--pre-research-complete")) filters.push(`v.pre_research_complete=true`);
    if(has("--without-mission")) filters.push(`not exists(select 1 from orchestration.mission m where m.slug='ai-engineer-video:'||v.video_id)`);
    const where=filters.length?`where ${filters.join(" and ")}`:"";
    const { rows } = await pool.query(`select v.video_id, v.title, v.published_at, v.duration_seconds,
      v.pre_research_complete, s.pipeline_status, s.latest_run_id
      from public.research_starter_videos v
      left join public.research_pre_research_video_state s using (video_id)
      ${where}
      order by v.published_at ${order === "asc" ? "asc" : "desc"} nulls last, v.video_id
      limit $1`, [limit]);
    output({ count: rows.length, order,filters:{eligible:has("--eligible"),pre_research_complete:has("--pre-research-complete"),without_mission:has("--without-mission")}, videos: rows });
  } finally { await pool.end(); }
}

const PRIORITY_WEIGHTS = {
  balanced: { chronology:0.35, continuity:0.30, opportunity:0.15, attention:0.10, engagement:0.05, cost:0.05 },
  "popular-media": { chronology:0.15, continuity:0.25, opportunity:0.15, attention:0.30, engagement:0.10, cost:0.05 },
  chronology: { chronology:0.70, continuity:0.15, opportunity:0.05, attention:0.05, engagement:0.00, cost:0.05 },
  "entity-cluster": { chronology:0.15, continuity:0.55, opportunity:0.15, attention:0.10, engagement:0.00, cost:0.05 }
};

function minMaxScore(values, value) {
  const finite = values.filter(Number.isFinite);
  if (!finite.length) return 0;
  const min = Math.min(...finite), max = Math.max(...finite);
  return max === min ? 1 : (value - min) / (max - min);
}

async function videosPrioritize() {
  const strategy = flag("--strategy", "balanced");
  if (!PRIORITY_WEIGHTS[strategy]) throw new Error("--strategy must be balanced, popular-media, chronology, or entity-cluster");
  const limit = positiveInteger("--limit", 20, 200);
  const cluster = String(flag("--entity", "")).trim().toLowerCase();
  const pool = dbPool();
  try {
    const [videosResult, identitiesResult] = await Promise.all([
      pool.query(`select v.video_id,v.title,v.published_at,v.duration_seconds,v.view_count,v.like_count,v.comment_count,
          s.latest_run_id,r.research_as_of,a.analysis_id
        from public.research_starter_videos v
        join public.research_pre_research_video_state s using(video_id)
        join public.research_pre_research_run r on r.run_id=s.latest_run_id and r.video_id=v.video_id
        join public.research_video_analysis a on a.run_id=r.run_id
        where v.transcript_status='stored' and v.transcript_bucket=$1 and v.transcript_path is not null
          and v.duration_seconds>0 and v.duration_seconds<5400 and v.pre_research_complete=true
          and s.pipeline_status='finished'
          and not exists(select 1 from orchestration.mission m where m.slug='ai-engineer-video:'||v.video_id)`, [TRANSCRIPT_BUCKET]),
      pool.query(`with identity_candidates as (
          select a.video_id,e.entity_kind::text as entity_kind,e.name,e.normalized_name,e.verification_status::text,e.confidence::float8
          from public.research_pre_research_video_state s
          join public.research_video_analysis a on a.run_id=s.latest_run_id and a.video_id=s.video_id
          join public.research_entity_candidate e on e.analysis_id=a.analysis_id
          where s.pipeline_status='finished' and e.entity_kind::text in ('person','organization')
          union all
          select o.video_id,'organization',o.canonical_name,o.normalized_name,
            case when o.confidence>=0.8 then 'verified' else 'uncertain' end,o.confidence::float8
          from public.research_pre_research_video_state s
          join public.research_organization_candidate o on o.video_id=s.video_id
          join public.research_video_analysis a on a.run_id=s.latest_run_id and a.video_id=s.video_id and a.analysis_id=o.analysis_id
          where s.pipeline_status='finished'
        )
        select distinct on(video_id,entity_kind,normalized_name) video_id,entity_kind,name,normalized_name,verification_status,confidence
        from identity_candidates order by video_id,entity_kind,normalized_name,confidence desc,name`)
    ]);
    const frequency = new Map();
    const identitiesByVideo = new Map();
    for (const identity of identitiesResult.rows) {
      const key = `${identity.entity_kind}:${identity.normalized_name}`;
      if (!identitiesByVideo.has(identity.video_id)) identitiesByVideo.set(identity.video_id, []);
      identitiesByVideo.get(identity.video_id).push({ ...identity, key });
      frequency.set(key, (frequency.get(key) ?? 0) + 1);
    }
    let candidates = videosResult.rows.map((video) => {
      const identities = identitiesByVideo.get(video.video_id) ?? [];
      const repeated = identities.filter((item) => (frequency.get(item.key) ?? 0) > 1);
      const uncertain = identities.filter((item) => item.verification_status !== "verified" || item.confidence < 0.8);
      return {
        ...video,
        entity_count: identities.length,
        uncertain_entity_count: uncertain.length,
        repeated_entity_count: repeated.length,
        entity_continuity_raw: repeated.reduce((total, item) => total + Math.log2(frequency.get(item.key)), 0),
        research_opportunity_raw: uncertain.length + Math.min(identities.length, 8) / 8,
        repeated_entities: repeated
          .sort((a,b) => (frequency.get(b.key) ?? 0) - (frequency.get(a.key) ?? 0) || a.name.localeCompare(b.name))
          .slice(0, 5)
          .map((item) => ({ kind:item.entity_kind,name:item.name,video_count:frequency.get(item.key) }))
      };
    });
    if (cluster) candidates = candidates.filter((video) => (identitiesByVideo.get(video.video_id) ?? []).some((item) => item.normalized_name === cluster));
    const chronologyValues = candidates.map((item) => -new Date(item.published_at).getTime());
    const continuityValues = candidates.map((item) => item.entity_continuity_raw);
    const opportunityValues = candidates.map((item) => item.research_opportunity_raw);
    const attentionValues = candidates.map((item) => Math.log1p(Number(item.view_count ?? 0)));
    const engagementValues = candidates.map((item) => Number(item.view_count) > 0 ? Number(item.like_count ?? 0) / Number(item.view_count) : 0);
    const costValues = candidates.map((item) => -Number(item.duration_seconds));
    const weights = PRIORITY_WEIGHTS[strategy];
    const ranked = candidates.map((item) => {
      const components = {
        chronology: minMaxScore(chronologyValues, -new Date(item.published_at).getTime()),
        continuity: minMaxScore(continuityValues, item.entity_continuity_raw),
        opportunity: minMaxScore(opportunityValues, item.research_opportunity_raw),
        attention: minMaxScore(attentionValues, Math.log1p(Number(item.view_count ?? 0))),
        engagement: minMaxScore(engagementValues, Number(item.view_count) > 0 ? Number(item.like_count ?? 0) / Number(item.view_count) : 0),
        cost: minMaxScore(costValues, -Number(item.duration_seconds))
      };
      const priorityScore = Object.entries(weights).reduce((total,[key,weight]) => total + components[key] * weight, 0);
      const { entity_continuity_raw, research_opportunity_raw, ...publicItem } = item;
      return { ...publicItem,priority_score:Number(priorityScore.toFixed(4)),score_components:Object.fromEntries(Object.entries(components).map(([key,value]) => [key,Number(value.toFixed(4))])) };
    }).sort((a,b) => b.priority_score-a.priority_score || new Date(a.published_at)-new Date(b.published_at) || a.video_id.localeCompare(b.video_id));
    const document = {
      generated_at:new Date().toISOString(),strategy,entity_filter:cluster||null,weights,
      policy:strategy === "popular-media"
        ? "Readiness is a hard gate. Use log-scaled reach and engagement as strong starter-packet signals while retaining entity continuity, research opportunity, chronology, and run cost so popularity never becomes identity or evidence."
        : "Readiness is a hard gate. Rank by chronology and cross-video entity continuity first; use pre-research ambiguity, log-scaled audience signals, engagement, and duration only as tie-breaking opportunity/cost signals.",
      candidate_count:ranked.length,videos:ranked.slice(0,limit)
    };
    outputOrWrite(document, { strategy,candidate_count:ranked.length,returned_videos:document.videos.length });
  } finally { await pool.end(); }
}

async function buildPreMissionContext(client, videoId) {
  const [videoResult, candidatesResult, organizationsResult, occurrencesResult, canonicalResult, missionResult] = await Promise.all([
    client.query(`select v.video_id,v.title,v.published_at,v.duration_seconds,v.view_count,v.like_count,v.comment_count,
        v.url,v.pre_research_complete,s.pipeline_status,s.latest_run_id,r.research_as_of,a.analysis_id
      from public.research_starter_videos v
      left join public.research_pre_research_video_state s using(video_id)
      left join public.research_pre_research_run r on r.run_id=s.latest_run_id
      left join public.research_video_analysis a on a.run_id=s.latest_run_id
      where v.video_id=$1`, [videoId]),
    client.query(`with latest as (
        select a.analysis_id from public.research_pre_research_video_state s
        join public.research_video_analysis a on a.run_id=s.latest_run_id and a.video_id=s.video_id where s.video_id=$1
      )
      select e.entity_kind::text,e.name,e.normalized_name,e.canonical_url,e.organization_name,e.relationship_to_video,
        e.confidence::float8,e.verification_status::text
      from public.research_entity_candidate e join latest l using(analysis_id)
      order by e.entity_kind,e.name`, [videoId]),
    client.query(`select o.canonical_name,o.normalized_name,o.organization_scope::text,o.relationship_roles::text[],
        o.is_primary_featured,o.featured_rank,o.official_url,o.current_status,o.status_as_of,o.video_time_name,
        o.ownership_changed_since_video,o.confidence::float8
      from public.research_pre_research_video_state s
      join public.research_pre_research_run r on r.run_id=s.latest_run_id and r.video_id=s.video_id
      join public.research_video_analysis a on a.run_id=r.run_id and a.video_id=r.video_id
      join public.research_organization_candidate o on o.analysis_id=a.analysis_id and o.video_id=r.video_id
      where s.video_id=$1 order by o.featured_rank,o.canonical_name`, [videoId]),
    client.query(`with current_entities as (
        select distinct e.entity_kind::text as entity_kind,e.name,e.normalized_name
        from public.research_pre_research_video_state s
        join public.research_video_analysis a on a.run_id=s.latest_run_id and a.video_id=s.video_id
        join public.research_entity_candidate e on e.analysis_id=a.analysis_id where s.video_id=$1
        union
        select 'organization',o.canonical_name,o.normalized_name
        from public.research_pre_research_video_state s
        join public.research_pre_research_run r on r.run_id=s.latest_run_id and r.video_id=s.video_id
        join public.research_video_analysis a on a.run_id=r.run_id and a.video_id=r.video_id
        join public.research_organization_candidate o on o.analysis_id=a.analysis_id and o.video_id=r.video_id where s.video_id=$1
      ), other_entities as (
        select a.video_id,e.entity_kind::text as entity_kind,e.normalized_name,v.title,v.published_at,
          m.id as mission_id,m.status::text as mission_status
        from public.research_pre_research_video_state s
        join public.research_video_analysis a on a.run_id=s.latest_run_id and a.video_id=s.video_id
        join public.research_entity_candidate e on e.analysis_id=a.analysis_id
        join public.research_starter_videos v on v.video_id=a.video_id
        left join orchestration.mission m on m.slug='ai-engineer-video:'||a.video_id
        where a.video_id<>$1
        union
        select o.video_id,'organization',o.normalized_name,v.title,v.published_at,m.id,m.status::text
        from public.research_pre_research_video_state s
        join public.research_pre_research_run r on r.run_id=s.latest_run_id and r.video_id=s.video_id
        join public.research_video_analysis a on a.run_id=r.run_id and a.video_id=r.video_id
        join public.research_organization_candidate o on o.analysis_id=a.analysis_id and o.video_id=r.video_id
        join public.research_starter_videos v on v.video_id=o.video_id
        left join orchestration.mission m on m.slug='ai-engineer-video:'||o.video_id
        where o.video_id<>$1
      )
      select c.entity_kind,c.name,c.normalized_name,count(distinct o.video_id)::int as other_video_count,
        coalesce(jsonb_agg(distinct jsonb_build_object('video_id',o.video_id,'title',o.title,'published_at',o.published_at,
          'mission_id',o.mission_id,'mission_status',o.mission_status)) filter(where o.video_id is not null),'[]'::jsonb) as other_videos
      from current_entities c left join other_entities o on o.entity_kind=c.entity_kind and o.normalized_name=c.normalized_name
      group by c.entity_kind,c.name,c.normalized_name order by other_video_count desc,c.entity_kind,c.name`, [videoId]),
    client.query(`with current_entities as (
        select distinct e.entity_kind::text as entity_kind,e.normalized_name,e.canonical_url
        from public.research_pre_research_video_state s
        join public.research_video_analysis a on a.run_id=s.latest_run_id and a.video_id=s.video_id
        join public.research_entity_candidate e on e.analysis_id=a.analysis_id where s.video_id=$1
        union
        select 'organization',o.normalized_name,o.official_url
        from public.research_pre_research_video_state s
        join public.research_pre_research_run r on r.run_id=s.latest_run_id and r.video_id=s.video_id
        join public.research_video_analysis a on a.run_id=r.run_id and a.video_id=r.video_id
        join public.research_organization_candidate o on o.analysis_id=a.analysis_id and o.video_id=r.video_id where s.video_id=$1
      )
      select 'person'::text as entity_kind,c.normalized_name,p.id as canonical_id,p.display_name,p.lifecycle_state::text,
        coalesce(jsonb_agg(jsonb_build_object('scheme',i.scheme,'value',i.value)) filter(where i.id is not null),'[]'::jsonb) as identifiers
      from current_entities c join corpus.person p on c.entity_kind='person' and lower(p.display_name)=c.normalized_name
      left join corpus.person_identifier i on i.person_id=p.id group by c.normalized_name,p.id
      union all
      select 'organization',c.normalized_name,o.id,o.display_name,o.lifecycle_state::text,
        coalesce(jsonb_agg(jsonb_build_object('scheme',i.scheme,'value',i.value)) filter(where i.id is not null),'[]'::jsonb)
      from current_entities c join corpus.organization o on c.entity_kind='organization'
        and (lower(o.display_name)=c.normalized_name or lower(coalesce(o.legal_name,''))=c.normalized_name or o.website_url=c.canonical_url)
      left join corpus.organization_identifier i on i.organization_id=o.id group by c.normalized_name,o.id`, [videoId]),
    client.query(`select id,status::text,created_at,updated_at from orchestration.mission where slug='ai-engineer-video:'||$1`, [videoId])
  ]);
  const video = videoResult.rows[0];
  if (!video) throw new Error(`Unknown video: ${videoId}`);
  const occurrences = occurrencesResult.rows.map((item) => ({
    ...item,
    other_videos:[...item.other_videos].sort((a,b) => new Date(a.published_at)-new Date(b.published_at) || a.video_id.localeCompare(b.video_id))
  }));
  const repeated = occurrences.filter((item) => item.other_video_count > 0);
  return {
    retrieved_at:new Date().toISOString(),query_kind:"pre_mission_entity_grounding",video,
    existing_mission:missionResult.rows[0] ?? null,
    current_entity_candidates:candidatesResult.rows,
    current_organization_candidates:organizationsResult.rows,
    cross_video_occurrences:repeated,
    canonical_matches:canonicalResult.rows,
    grounding_summary:{
      candidate_count:candidatesResult.rowCount,
      repeated_entity_count:repeated.length,
      canonical_match_count:canonicalResult.rowCount,
      research_as_of:video.research_as_of,
      rule:"Treat normalized-name overlap as retrieval context, not identity proof. Reuse a canonical ID only after identifier/source agreement; preserve video-time and current-time facts separately."
    }
  };
}

async function missionPreflight() {
  const videoId = required("--video-id");
  const pool = dbPool();
  try {
    const context = await buildPreMissionContext(pool, videoId);
    const outputPath = flag("--output");
    if (!outputPath) return output(context);
    const resolvedPath = resolve(String(outputPath));
    if (existsSync(resolvedPath) && !has("--overwrite")) throw new Error(`Output already exists: ${resolvedPath}; use --overwrite to replace it`);
    const bytes = Buffer.from(canonicalJson(context));
    mkdirSync(dirname(resolvedPath), { recursive:true });
    writeFileSync(resolvedPath, bytes);
    output({ ok:true,video_id:videoId,output:resolvedPath,bytes:bytes.length,sha256:sha256(bytes),grounding_summary:context.grounding_summary });
  }
  finally { await pool.end(); }
}

async function videoGet() {
  const pool = dbPool();
  const videoId = required("--video-id");
  try {
    const [video, analyses, entities, organizations, sources, artifacts] = await Promise.all([
      pool.query(`select video_id,title,published_at,duration_seconds,url,transcript_bucket,transcript_path,transcript_char_count,transcript_status,pre_research_complete from public.research_starter_videos where video_id=$1`, [videoId]),
      pool.query(`select r.run_id,r.status,r.research_as_of,r.packet_storage_prefix,a.analysis_id,a.initial_summary,a.contextualized_abstract,a.why_it_matters from public.research_pre_research_run r left join public.research_video_analysis a on a.run_id=r.run_id where r.video_id=$1 order by r.created_at desc`, [videoId]),
      pool.query(`select e.entity_kind,e.name,e.normalized_name,e.canonical_url,e.organization_name,e.relationship_to_video,e.confidence,e.verification_status from public.research_entity_candidate e join public.research_video_analysis a using (analysis_id) where a.video_id=$1 order by e.entity_kind,e.name`, [videoId]),
      pool.query(`select canonical_name,organization_scope,relationship_roles,is_primary_featured,featured_rank,official_url,confidence from public.research_organization_candidate where video_id=$1 order by featured_rank`, [videoId]),
      pool.query(`select s.title,s.publisher,s.url,s.authority_tier,s.source_role,s.verification_status,s.source_published_at,s.retrieved_at from public.research_organization_source s join public.research_organization_candidate c using (organization_candidate_id) where c.video_id=$1 order by c.featured_rank,s.source_rank`, [videoId]),
      pool.query(`select a.artifact_kind,a.storage_bucket,a.storage_path,a.content_sha256,a.byte_count from public.research_pre_research_artifact a join public.research_pre_research_run r using (run_id) where r.video_id=$1 order by a.created_at`, [videoId])
    ]);
    const document = { retrieved_at:new Date().toISOString(),video: video.rows[0] ?? null, runs: analyses.rows, entity_candidates: entities.rows, organizations: organizations.rows, organization_sources: sources.rows, pre_research_artifacts: artifacts.rows };
    outputOrWrite(document, { video_id:videoId });
  } finally { await pool.end(); }
}

async function transcriptGet() {
  const videoId = required("--video-id");
  const outPath = resolve(required("--output"));
  if (existsSync(outPath) && !has("--overwrite")) throw new Error(`Output already exists: ${outPath}; use --overwrite to replace it`);
  const pool = dbPool();
  try {
    const video = (await pool.query(`select video_id,title,transcript_bucket,transcript_path,transcript_char_count,transcript_status
      from public.research_starter_videos where video_id=$1`,[videoId])).rows[0];
    if (!video) throw new Error(`Unknown video: ${videoId}`);
    if (video.transcript_bucket !== TRANSCRIPT_BUCKET || !video.transcript_path) throw new Error(`Video ${videoId} has no ${TRANSCRIPT_BUCKET} pointer`);
    const objectPath = String(video.transcript_path).replace(/^\/+/, "");
    if (objectPath !== `ai-dot-engineer/${videoId}.txt`) throw new Error(`Unexpected transcript path for ${videoId}: ${objectPath}`);
    const result = await storageClient().storage.from(TRANSCRIPT_BUCKET).download(objectPath);
    if (result.error) throw result.error;
    const bytes = Buffer.from(await result.data.arrayBuffer());
    mkdirSync(dirname(outPath), { recursive:true });
    writeFileSync(outPath, bytes);
    output({ ok:true,video_id:videoId,title:video.title,bucket:TRANSCRIPT_BUCKET,path:objectPath,output:outPath,bytes:bytes.length,sha256:sha256(bytes),expected_char_count:video.transcript_char_count });
  } finally { await pool.end(); }
}

async function taxonomySnapshot() {
  const pool = dbPool();
  const outPath = resolve(flag("--output", resolve(ROOT, "schema-workspace/taxonomy.snapshot.json")));
  try {
    const [facets, versions, terms, relations] = await Promise.all([
      pool.query("select id,slug,label,description,cardinality from taxonomy.facet order by slug"),
      pool.query("select id,facet_id,version,status,approved_at,notes from taxonomy.facet_version order by facet_id,version"),
      pool.query("select id,facet_version_id,slug,label,definition,parent_term_id,sort_order from taxonomy.term order by facet_version_id,sort_order,slug"),
      pool.query("select from_term_id,to_term_id,relation_kind from taxonomy.term_relation order by from_term_id,to_term_id")
    ]);
    const snapshot = { schema_version:"ai-engineer-taxonomy-snapshot/1", generated_at:new Date().toISOString(), facets:facets.rows, facet_versions:versions.rows, terms:terms.rows, relations:relations.rows };
    mkdirSync(dirname(outPath), {recursive:true}); writeFileSync(outPath,canonicalJson(snapshot));
    output({ok:true,output:outPath,facets:facets.rowCount,terms:terms.rowCount,sha256:sha256(readFileSync(outPath))});
  } finally { await pool.end(); }
}

const WORK_GRAPH = [
  ["select", "select_entities", []], ["sources", "discover_sources", ["select"]],
  ["capture", "capture_source", ["sources"]], ["claims", "extract_claims", ["capture"]],
  ["resolve", "resolve_identity", ["claims"]], ["metrics", "probe_metrics", ["resolve"]],
  ["verify", "verify_extraction", ["claims","metrics"]], ["intent", "build_ingestion_intent", ["resolve","verify"]],
  ["execute", "execute_ingestion_intent", ["intent"]], ["report", "synthesize_report", ["execute"]],
  ["timeline", "update_timeline", ["report"]]
];

async function progressSeed() {
  const videoId = required("--video-id");
  const plan = { mission_slug: `ai-engineer-video:${videoId}`, work_items: WORK_GRAPH.map(([key, kind, depends]) => ({ key, kind, depends })) };
  const pool = dbPool(); let client;
  try {
    const preMissionRetrieval = await buildPreMissionContext(pool, videoId);
    if (!has("--apply")) return output({ dry_run: true,pre_mission_retrieval:preMissionRetrieval,...plan });
    client = await pool.connect();
    await client.query("begin");
    const video = await client.query("select title,published_at from public.research_starter_videos where video_id=$1", [videoId]);
    if (!video.rows[0]) throw new Error(`Unknown video: ${videoId}`);
    const mission = await client.query(`insert into orchestration.mission(slug,goal,research_questions,acceptance_criteria,status,started_at)
      values($1,$2,$3,$4,'running',now()) on conflict(tenant_id,slug) do update set updated_at=now() returning id`,
      [plan.mission_slug, `Research, resolve, metric-probe, verify, and ingest entities from ${video.rows[0].title}`, JSON.stringify(["Which entities matter most?","Which primary metrics are reproducibly observable?"]), JSON.stringify(["Every factual claim has a locator","Every metric has an immutable capture","Canonical writes have an intent and receipt"])]);
    const ids = {};
    for (const [key, kind] of WORK_GRAPH) {
      const item = await client.query(`insert into orchestration.work_item(mission_id,kind,spec,status,idempotency_key)
        values($1,$2,$3,'ready',$4) on conflict(tenant_id,idempotency_key) where idempotency_key is not null
        do update set spec=excluded.spec returning id`, [mission.rows[0].id, kind, JSON.stringify({ video_id: videoId, published_at: video.rows[0].published_at }), `${plan.mission_slug}:${key}`]);
      ids[key] = item.rows[0].id;
      await client.query(`insert into orchestration.work_item_event(work_item_id,event_type,actor,payload)
        select $1,'created',$2,$3 where not exists (
          select 1 from orchestration.work_item_event where work_item_id=$1 and event_type='created'
        )`, [ids[key], flag("--actor","workspace-seeder"), JSON.stringify({ video_id: videoId, key })]);
    }
    for (const [key,, depends] of WORK_GRAPH) for (const dep of depends) await client.query(`insert into orchestration.work_item_dependency(work_item_id,depends_on_id) values($1,$2) on conflict do nothing`, [ids[key], ids[dep]]);
    await client.query("commit"); output({ ok: true, mission_id: mission.rows[0].id,pre_mission_retrieval:preMissionRetrieval,work_items: ids });
  } catch (error) { if (client) await client.query("rollback"); throw error; } finally { client?.release(); await pool.end(); }
}

async function progressStatus() {
  const pool = dbPool();
  try {
    const mission = await resolveMission(pool);
    const [items,events] = await Promise.all([
      pool.query(`select w.id,w.kind,w.status,w.attempt_count,w.max_attempts,w.lease_owner,w.lease_expires_at,w.heartbeat_at,
        coalesce(jsonb_agg(d.depends_on_id) filter (where d.depends_on_id is not null),'[]'::jsonb) as depends_on
        from orchestration.work_item w left join orchestration.work_item_dependency d on d.work_item_id=w.id
        where w.mission_id=$1 group by w.id order by w.created_at,w.id`,[mission.id]),
      pool.query(`select e.id,e.work_item_id,e.attempt_id,e.event_type,e.actor,e.message,e.payload,e.occurred_at
        from orchestration.work_item_event e join orchestration.work_item w on w.id=e.work_item_id
        where w.mission_id=$1 order by e.occurred_at,e.id`,[mission.id])
    ]);
    output({ ok:true,mission,work_items:items.rows,events:events.rows });
  } finally { await pool.end(); }
}

async function progressClaim() {
  assertApply(); const worker = required("--worker"); const leaseSeconds = positiveInteger("--lease-seconds",1800,7200);
  const pool=dbPool(); const client=await pool.connect();
  try { await client.query("begin");
    const mission = await resolveMission(client);
    const result=await client.query(`with candidate as (
      select w.id from orchestration.work_item w where
        w.mission_id=$3
        and w.attempt_count < w.max_attempts
        and
        (w.status='ready' or (w.status='running' and w.lease_expires_at<now()))
        and not exists (select 1 from orchestration.work_item_dependency d join orchestration.work_item p on p.id=d.depends_on_id where d.work_item_id=w.id and p.status<>'succeeded')
      order by w.created_at,w.id for update of w skip locked limit 1)
      update orchestration.work_item w set status='running',lease_owner=$1,lease_expires_at=now()+make_interval(secs=>$2),heartbeat_at=now(),attempt_count=attempt_count+1
      from candidate c where w.id=c.id returning w.*`, [worker,leaseSeconds,mission.id]);
    if (!result.rows[0]) { await client.query("commit"); return output({ ok:true,mission_id:mission.id,claimed:null }); }
    const w=result.rows[0];
    await client.query(`update orchestration.attempt set outcome='timeout',ended_at=now()
      where work_item_id=$1 and outcome is null`,[w.id]);
    const attempt=await client.query(`insert into orchestration.attempt(work_item_id,attempt_no,agent_deployment_id) values($1,$2,$3) returning id`, [w.id,w.attempt_count,worker]);
    await client.query(`insert into orchestration.work_item_event(work_item_id,attempt_id,event_type,actor,payload) values($1,$2,'claimed',$3,$4)`,[w.id,attempt.rows[0].id,worker,JSON.stringify({lease_seconds:leaseSeconds})]);
    await client.query("commit"); output({ok:true,mission_id:mission.id,claimed:{...w,attempt_id:attempt.rows[0].id}});
  } catch(error){await client.query("rollback");throw error;} finally{client.release();await pool.end();}
}

async function progressHeartbeat() {
  assertApply(); const worker=required("--worker"), workItem=required("--work-item"); const leaseSeconds=positiveInteger("--lease-seconds",1800,7200); const pool=dbPool(); const client=await pool.connect();
  try { await client.query("begin"); const result=await client.query(`update orchestration.work_item set heartbeat_at=now(),lease_expires_at=now()+make_interval(secs=>$3) where id=$1 and status='running' and lease_owner=$2 returning id,lease_expires_at`,[workItem,worker,leaseSeconds]); if(!result.rows[0]) throw new Error("Lease not owned by worker or no longer running"); await client.query(`insert into orchestration.work_item_event(work_item_id,event_type,actor,payload) values($1,'heartbeat',$2,$3)`,[workItem,worker,JSON.stringify({lease_seconds:leaseSeconds})]); await client.query("commit"); output({ok:true,...result.rows[0]}); } catch(error){await client.query("rollback");throw error;} finally{client.release();await pool.end();}
}

async function progressFinish() {
  assertApply(); const worker=required("--worker"), workItem=required("--work-item"), attemptId=required("--attempt-id"), outcome=flag("--outcome","succeeded");
  if(!["succeeded","failed","blocked"].includes(outcome)) throw new Error("--outcome must be succeeded, failed, or blocked");
  const payloadPath=flag("--payload-file"); const payload=payloadPath?JSON.parse(readFileSync(resolve(payloadPath),"utf8")):{}; const pool=dbPool(); const client=await pool.connect();
  try{await client.query("begin"); const terminal=outcome==="blocked"?"blocked":outcome; const attemptOutcome=outcome==="blocked"?"failed":outcome;
    const updated=await client.query(`update orchestration.work_item set status=$3,terminal_evidence=$4,lease_owner=null,lease_expires_at=null,heartbeat_at=null where id=$1 and lease_owner=$2 and status='running' returning id`,[workItem,worker,terminal,JSON.stringify(payload)]); if(!updated.rows[0]) throw new Error("Lease not owned by worker or no longer running");
    const attempt=await client.query(`update orchestration.attempt set outcome=$2,ended_at=now() where id=$1 and work_item_id=$3 and agent_deployment_id=$4 and outcome is null returning id`,[attemptId,attemptOutcome,workItem,worker]);
    if(!attempt.rows[0]) throw new Error("Attempt does not belong to this worker/work item or is already terminal");
    await client.query(`insert into orchestration.work_item_event(work_item_id,attempt_id,event_type,actor,payload) values($1,$2,$3,$4,$5)`,[workItem,attemptId,outcome,worker,JSON.stringify(payload)]); await client.query("commit"); output({ok:true,work_item_id:workItem,outcome});
  }catch(error){await client.query("rollback");throw error;}finally{client.release();await pool.end();}
}

async function artifactsArchive() {
  const scope = missionScope(), workItemId=required("--work-item"), attemptId=required("--attempt-id");
  const rootPath = resolve(required("--root"));
  if (!existsSync(rootPath)) throw new Error(`Archive root does not exist: ${rootPath}`);
  const relativeRun = relative(RUNS_ROOT, rootPath);
  if (relativeRun === "" || relativeRun.startsWith(`..${sep}`) || relativeRun === ".." || resolve(rootPath) === ROOT) {
    throw new Error(`Archive roots must be a child of ${RUNS_ROOT}`);
  }
  const paths=filesUnder(rootPath);
  if(paths.length===0) throw new Error("Archive root contains no files");
  const pool=dbPool(); const client=await pool.connect();
  try {
    const mission=await resolveMission(client,scope); const attempt=await attemptScope(client,mission,workItemId,attemptId); const prefix=attemptPrefix(mission,workItemId,attempt);
    const files=paths.map(path=>{const bytes=readFileSync(path); const hash=sha256(bytes); const relativePath=relative(rootPath,path).split(sep).join("/"); return {path,relative_path:relativePath,bytes,sha256:hash,size_bytes:bytes.length,media_type:mediaType(path),object_path:`${prefix}/workspace/files/${hash}/${relativePath}`};});
    const manifestBase={schema_version:"ai-engineer-workspace-manifest/1",mission_id:mission.id,mission_slug:mission.slug,work_item_id:workItemId,attempt_id:attemptId,attempt_no:attempt.attempt_no,files:files.map(({relative_path,sha256,size_bytes,media_type,object_path})=>({relative_path,sha256,size_bytes,media_type,storage_bucket:BUCKET,object_path}))};
    const manifestBytes=Buffer.from(canonicalJson(manifestBase)); const manifestHash=sha256(manifestBytes); const manifestPath=`${prefix}/workspace/manifest/${manifestHash}.json`;
    if(!has("--apply")) return output({dry_run:true,bucket:BUCKET,prefix,file_count:files.length,total_bytes:files.reduce((n,f)=>n+f.size_bytes,0),manifest:{path:manifestPath,sha256:manifestHash},files:manifestBase.files});
    const supabase=storageClient();
    for(const file of files) await uploadImmutable(supabase,BUCKET,file.object_path,file.bytes,file.media_type,file.sha256);
    await uploadImmutable(supabase,BUCKET,manifestPath,manifestBytes,"application/json",manifestHash);
    await client.query("begin");
    const produced=[];
    for(const file of files){const artifact=await registerArtifact(client,{artifactType:"workspace_file",hash:file.sha256,bucketClass:"candidate",objectPath:file.object_path,media:file.media_type,size:file.size_bytes,attemptId,missionId:mission.id}); produced.push(artifact); await client.query(`insert into orchestration.work_item_artifact(work_item_id,artifact_id,role) values($1,$2,'produced') on conflict do nothing`,[workItemId,artifact.id]);}
    const manifestArtifact=await registerArtifact(client,{artifactType:"workspace_manifest",hash:manifestHash,bucketClass:"ledger",objectPath:manifestPath,media:"application/json",size:manifestBytes.length,attemptId,missionId:mission.id});
    await client.query(`insert into orchestration.work_item_artifact(work_item_id,artifact_id,role) values($1,$2,'produced') on conflict do nothing`,[workItemId,manifestArtifact.id]);
    await client.query(`insert into orchestration.artifact_manifest(mission_id,work_item_id,required,produced)
      select $1,$2,'[]'::jsonb,$3 where not exists (
        select 1 from orchestration.artifact_manifest where mission_id=$1 and work_item_id=$2 and produced @> $3::jsonb
      )`,[mission.id,workItemId,JSON.stringify([{artifact_id:manifestArtifact.id,artifact_type:"workspace_manifest",sha256:manifestHash},...produced.map(a=>({artifact_id:a.id,artifact_type:a.artifact_type,sha256:a.sha256}))])]);
    await client.query(`insert into orchestration.work_item_event(work_item_id,attempt_id,event_type,actor,payload)
      select $1,$2,'checkpoint',$3,$4 where not exists (
        select 1 from orchestration.work_item_event
        where work_item_id=$1 and attempt_id=$2 and event_type='checkpoint' and payload->>'manifest_sha256'=$5
      )`,[workItemId,attemptId,attempt.lease_owner??flag("--actor","archive-worker"),JSON.stringify({workspace_manifest_artifact_id:manifestArtifact.id,manifest_sha256:manifestHash,file_count:files.length}),manifestHash]);
    await client.query("commit");
    if(has("--cleanup")) rmSync(rootPath,{recursive:true,force:false});
    output({ok:true,cleaned_up:has("--cleanup"),root:rootPath,bucket:BUCKET,prefix,file_count:files.length,total_bytes:files.reduce((n,f)=>n+f.size_bytes,0),manifest_artifact_id:manifestArtifact.id,manifest_path:manifestPath,manifest_sha256:manifestHash});
  } catch(error){try{await client.query("rollback");}catch{} throw error;} finally{client.release();await pool.end();}
}

async function artifactDownload() {
  const artifactId=required("--artifact-id"),outPath=resolve(required("--output"));
  if(existsSync(outPath)&&!has("--overwrite"))throw new Error(`Output already exists: ${outPath}; use --overwrite to replace it`);
  const pool=dbPool();try{const artifact=(await pool.query(`select * from orchestration.artifact where id=$1`,[artifactId])).rows[0];if(!artifact)throw new Error("Artifact not found");
    const result=await storageClient().storage.from(artifact.storage_bucket).download(artifact.object_path);if(result.error)throw result.error;const bytes=Buffer.from(await result.data.arrayBuffer());if(sha256(bytes)!==artifact.sha256)throw new Error("Downloaded artifact SHA-256 does not match the registry");mkdirSync(dirname(outPath),{recursive:true});writeFileSync(outPath,bytes);output({ok:true,artifact_id:artifactId,output:outPath,bytes:bytes.length,sha256:artifact.sha256,bucket:artifact.storage_bucket,path:artifact.object_path});}finally{await pool.end();}
}

async function sourceCacheLookup() {
  const url=required("--url"); const pool=dbPool();
  try { const rows=await pool.query(`select s.id as source_id,s.source_class,s.canonical_url,c.id as capture_id,c.content_sha256,c.media_type,c.captured_at,c.capture_method,
      a.id as artifact_id,a.storage_bucket,a.object_path,a.size_bytes
      from evidence.source s left join evidence.source_capture c on c.source_id=s.id
      left join orchestration.artifact a on a.id=c.artifact_id
      where s.canonical_url=$1 order by c.captured_at desc nulls last`,[url]); output({ok:true,url,cache_hit:rows.rows.some(r=>r.capture_id),captures:rows.rows}); }
  finally{await pool.end();}
}

async function sourceQueryRecord() {
  assertApply(); const scope=missionScope(),workItemId=required("--work-item"),attemptId=required("--attempt-id"),provider=required("--provider"),query=required("--query"),purpose=required("--purpose"),responsePath=resolve(required("--response-file"));
  const params=jsonFile("--parameters-file",{}); const responseBytes=readFileSync(responsePath); const responseHash=sha256(responseBytes); const queryHash=sha256(canonicalJson({provider,query,purpose,parameters:params}));
  const pool=dbPool(); const client=await pool.connect();
  try{const mission=await resolveMission(client,scope);const attempt=await attemptScope(client,mission,workItemId,attemptId);const objectPath=`${attemptPrefix(mission,workItemId,attempt)}/queries/${safeSegment(provider)}/${queryHash}/${responseHash}${extname(responsePath).toLowerCase()||".bin"}`;
    await uploadImmutable(storageClient(),BUCKET,objectPath,responseBytes,mediaType(responsePath),responseHash); await client.query("begin");
    const artifact=await registerArtifact(client,{artifactType:"source_query_response",hash:responseHash,bucketClass:"source_captures",objectPath,media:mediaType(responsePath),size:responseBytes.length,attemptId,missionId:mission.id});
    await client.query(`insert into orchestration.work_item_artifact(work_item_id,artifact_id,role) values($1,$2,'produced') on conflict do nothing`,[workItemId,artifact.id]);
    const recorded=await client.query(`insert into evidence.source_query(mission_id,work_item_id,attempt_id,provider,query_text,purpose,request_parameters,response_artifact_id,query_sha256)
      values($1,$2,$3,$4,$5,$6,$7,$8,$9) on conflict(attempt_id,provider,query_sha256) do nothing returning *`,[mission.id,workItemId,attemptId,provider,query,purpose,JSON.stringify(params),artifact.id,queryHash]);
    const sourceQuery=recorded.rows[0]??(await client.query(`select * from evidence.source_query where attempt_id=$1 and provider=$2 and query_sha256=$3`,[attemptId,provider,queryHash])).rows[0];
    if(sourceQuery.response_artifact_id!==artifact.id) throw new Error("Query idempotency key collides with a different response artifact");
    await client.query("commit"); output({ok:true,source_query_id:sourceQuery.id,query_sha256:queryHash,response_artifact_id:artifact.id,bucket:BUCKET,path:objectPath,response_sha256:responseHash});
  }catch(error){try{await client.query("rollback");}catch{}throw error;}finally{client.release();await pool.end();}
}

async function sourceCaptureRecord() {
  assertApply(); const scope=missionScope(),workItemId=required("--work-item"),attemptId=required("--attempt-id"),url=required("--url"),capturePath=resolve(required("--capture-file")),operation=required("--operation"),statement=required("--supports"),supportRole=flag("--support-role","supports"),sourceClass=flag("--source-class","web_page"),method=flag("--capture-method","cloud-agent-cli"),methodVersion=flag("--capture-method-version","1"),queryId=flag("--query-id")||null;
  if(!["supports","challenges","context","background","discarded"].includes(supportRole)) throw new Error("Invalid --support-role");
  const bytes=readFileSync(capturePath),hash=sha256(bytes),providerMetadata=jsonFile("--metadata-file",{}); const pool=dbPool(),client=await pool.connect();
  try{const mission=await resolveMission(client,scope);const attempt=await attemptScope(client,mission,workItemId,attemptId);const objectPath=`${attemptPrefix(mission,workItemId,attempt)}/sources/${hash}/${safeSegment(basename(capturePath))}`;
    await uploadImmutable(storageClient(),BUCKET,objectPath,bytes,mediaType(capturePath),hash);await client.query("begin");
    if(queryId){const linked=(await client.query(`select id from evidence.source_query where id=$1 and mission_id=$2 and work_item_id=$3 and attempt_id=$4`,[queryId,mission.id,workItemId,attemptId])).rows[0];if(!linked)throw new Error("--query-id does not belong to this attempt scope");}
    const artifact=await registerArtifact(client,{artifactType:"source_capture",hash,bucketClass:"source_captures",objectPath,media:mediaType(capturePath),size:bytes.length,attemptId,missionId:mission.id});
    const source=(await client.query(`insert into evidence.source(source_class,canonical_url) values($1,$2) on conflict(canonical_url) where canonical_url is not null do update set canonical_url=excluded.canonical_url returning id`,[sourceClass,url])).rows[0];
    const insertedCapture=await client.query(`insert into evidence.source_capture(source_id,artifact_id,content_sha256,media_type,capture_method,capture_method_version,request_url,context,produced_by_attempt_id)
      values($1,$2,$3,$4,$5,$6,$7,$8,$9) on conflict(artifact_id) do nothing returning id`,[source.id,artifact.id,hash,mediaType(capturePath),method,methodVersion,url,JSON.stringify({mission_id:mission.id,work_item_id:workItemId}),attemptId]);
    const captureId=insertedCapture.rows[0]?.id??(await client.query(`select id from evidence.source_capture where artifact_id=$1`,[artifact.id])).rows[0]?.id;
    const insertedRetrieval=await client.query(`insert into evidence.source_retrieval(query_id,source_id,capture_id,work_item_id,attempt_id,requested_url,retrieval_status,provider_metadata)
      values($1,$2,$3,$4,$5,$6,'captured',$7) on conflict(attempt_id,query_id,capture_id) do nothing returning id`,[queryId,source.id,captureId,workItemId,attemptId,url,JSON.stringify(providerMetadata)]);
    const retrievalId=insertedRetrieval.rows[0]?.id??(await client.query(`select id from evidence.source_retrieval where attempt_id=$1 and query_id is not distinct from $2 and capture_id=$3`,[attemptId,queryId,captureId])).rows[0]?.id;
    const support=(await client.query(`insert into evidence.source_support(retrieval_id,work_item_id,operation,support_role,statement)
      values($1,$2,$3,$4,$5) on conflict(retrieval_id,work_item_id,operation,support_role,statement) do update set statement=excluded.statement returning id`,[retrievalId,workItemId,operation,supportRole,statement])).rows[0];
    await client.query(`insert into orchestration.work_item_artifact(work_item_id,artifact_id,role) values($1,$2,'produced') on conflict do nothing`,[workItemId,artifact.id]);
    await client.query("commit");output({ok:true,source_id:source.id,capture_id:captureId,retrieval_id:retrievalId,support_id:support.id,artifact_id:artifact.id,bucket:BUCKET,path:objectPath,sha256:hash});
  }catch(error){try{await client.query("rollback");}catch{}throw error;}finally{client.release();await pool.end();}
}

async function intentValidate() { const path=resolve(required("--file")); const document=validateIntentDocument(JSON.parse(readFileSync(path,"utf8"))); const canonical=canonicalJson(document); output({ok:true,file:path,operations:document.payload.operations.length,sha256:sha256(canonical),canonical_bytes:Buffer.byteLength(canonical)}); }

async function intentSubmit() {
  const path=resolve(required("--file")); const document=validateIntentDocument(JSON.parse(readFileSync(path,"utf8"))); const canonical=canonicalJson(document); const hash=sha256(canonical); const objectPath=`intents/${document.video_id??"unscoped"}/${hash}.json`;
  if(!has("--apply")) return output({dry_run:true,sha256:hash,bucket:BUCKET,path:objectPath,idempotency_key:document.idempotency_key,operations:document.payload.operations.length});
  const supabase=storageClient(); const {error}=await supabase.storage.from(BUCKET).upload(objectPath,canonical,{contentType:"application/json",upsert:false});
  if(error && !String(error.message).toLowerCase().includes("already exists")) throw error;
  const pool=dbPool(); const client=await pool.connect();
  try{await client.query("begin"); const intent=await client.query(`select api.submit_intent($1,$2::jsonb,$3,$4::uuid,$5::uuid,$6::jsonb) as id`,[document.intent_type,JSON.stringify({...document.payload,intent_artifact:{bucket:BUCKET,path:objectPath,sha256:hash}}),document.idempotency_key,document.mission_id??null,document.attempt_id??null,JSON.stringify(document.preconditions)]);
    const artifact=await client.query(`insert into orchestration.artifact(artifact_type,sha256,bucket_class,storage_bucket,object_path,media_type,size_bytes,producer_attempt_id,mission_id)
      values('ingestion_intent',$1,'ledger',$2,$3,'application/json',$4,$5,$6) on conflict(storage_bucket,object_path) do update set object_path=excluded.object_path returning id`,[hash,BUCKET,objectPath,Buffer.byteLength(canonical),document.attempt_id??null,document.mission_id??null]);
    await client.query("commit"); output({ok:true,intent_id:intent.rows[0].id,artifact_id:artifact.rows[0].id,bucket:BUCKET,path:objectPath,sha256:hash});
  }catch(error){await client.query("rollback");throw error;}finally{client.release();await pool.end();}
}

async function intentExecute() {
  assertApply(); const intentId=required("--intent-id"); const executor=flag("--executor-version","research-cloud-cli@1"); const pool=dbPool(); const client=await pool.connect();
  try{await client.query("begin"); const selected=await client.query(`select * from orchestration.operation_intent where id=$1 for update`,[intentId]); const intent=selected.rows[0]; if(!intent) throw new Error("Intent not found");
    const prior=await client.query(`select * from orchestration.operation_receipt where intent_id=$1`,[intentId]); if(prior.rows[0]){await client.query("commit");return output({ok:true,idempotent:true,receipt:prior.rows[0]});}
    if(!["approved","budgeted"].includes(intent.approval_state)) throw new Error(`Intent approval_state is ${intent.approval_state}; expected approved or budgeted`);
    const document=validateIntentDocument({schema_version:"ai-engineer-ingestion-intent/1",intent_type:intent.intent_type,idempotency_key:intent.idempotency_key,mission_id:intent.mission_id,attempt_id:intent.proposed_by_attempt,preconditions:intent.preconditions,payload:intent.payload});
    const receiptId=(await client.query("select util.uuidv7() as id")).rows[0].id;
    const results={}; const plans=[]; const affected=[];
    for(const operation of document.payload.operations){const [schema,table]=operation.target.split("."); const values=resolveRefs(operation.values,results);
      const metadata=await client.query(`select column_name from information_schema.columns where table_schema=$1 and table_name=$2`,[schema,table]); const allowed=new Set(metadata.rows.map(r=>r.column_name));
      if(allowed.has("id")&&!values.id) values.id=(await client.query("select util.uuidv7() as id")).rows[0].id;
      if(allowed.has("created_by_receipt_id")&&!values.created_by_receipt_id) values.created_by_receipt_id=receiptId;
      if(allowed.has("updated_by_receipt_id")&&!values.updated_by_receipt_id&&operation.action==="upsert") values.updated_by_receipt_id=receiptId;
      results[operation.id]={...values};
      affected.push({operation_id:operation.id,target:operation.target,ref:values.id??Object.fromEntries((operation.conflict_columns??[]).map(column=>[column,values[column]]))});
      plans.push({operation,schema,table,values,allowed});
    }
    await client.query(`insert into orchestration.operation_receipt(id,intent_id,executor_version,precondition_results,outcome,changes_summary,affected_refs) values($1,$2,$3,$4,'applied',$5,$6)`,[receiptId,intentId,executor,JSON.stringify({checked_at:new Date().toISOString(),declared:intent.preconditions}),JSON.stringify({operation_count:affected.length}),JSON.stringify(affected)]);
    for(const plan of plans){const {operation,schema,table,values,allowed}=plan;
      const columns=Object.keys(values); for(const column of [...columns,...(operation.conflict_columns??[]),...(operation.returning??["id"])]) if(!allowed.has(column)) throw new Error(`${operation.target}.${column} is not a column`);
      const params=columns.map((_,i)=>`$${i+1}`); let sql=`insert into ${quoteIdent(schema)}.${quoteIdent(table)} (${columns.map(quoteIdent).join(",")}) values (${params.join(",")})`;
      if(operation.action==="upsert") sql+=` on conflict (${operation.conflict_columns.map(quoteIdent).join(",")}) do update set ${columns.filter(c=>!operation.conflict_columns.includes(c)&&!["id","created_by_receipt_id","created_at"].includes(c)).map(c=>`${quoteIdent(c)}=excluded.${quoteIdent(c)}`).join(",")||`${quoteIdent(operation.conflict_columns[0])}=excluded.${quoteIdent(operation.conflict_columns[0])}`}`;
      const returning=operation.returning??(allowed.has("id")?["id"]:columns); sql+=` returning ${returning.map(quoteIdent).join(",")}`; const applied=await client.query(sql,columns.map(c=>values[c])); results[operation.id]=applied.rows[0];
    }
    await client.query("commit"); output({ok:true,receipt_id:receiptId,affected_refs:affected});
  }catch(error){await client.query("rollback");throw error;}finally{client.release();await pool.end();}
}

loadEnvironment();
try {
  if (command === "verify") await verify();
  else if (command === "schema" && ["snapshot", "workspace"].includes(subcommand)) await schemaWorkspace();
  else if (command === "videos" && subcommand === "list") await videosList();
  else if (command === "videos" && subcommand === "prioritize") await videosPrioritize();
  else if (command === "video" && subcommand === "get") await videoGet();
  else if (command === "mission" && subcommand === "preflight") await missionPreflight();
  else if (command === "transcript" && subcommand === "get") await transcriptGet();
  else if (command === "taxonomy" && subcommand === "snapshot") await taxonomySnapshot();
  else if (command === "progress" && subcommand === "seed") await progressSeed();
  else if (command === "progress" && subcommand === "status") await progressStatus();
  else if (command === "progress" && subcommand === "claim") await progressClaim();
  else if (command === "progress" && subcommand === "heartbeat") await progressHeartbeat();
  else if (command === "progress" && subcommand === "finish") await progressFinish();
  else if (command === "artifacts" && subcommand === "archive") await artifactsArchive();
  else if (command === "artifact" && subcommand === "download") await artifactDownload();
  else if (command === "source" && subcommand === "cache-lookup") await sourceCacheLookup();
  else if (command === "source" && subcommand === "query-record") await sourceQueryRecord();
  else if (command === "source" && subcommand === "capture-record") await sourceCaptureRecord();
  else if (command === "intent" && subcommand === "validate") await intentValidate();
  else if (command === "intent" && subcommand === "submit") await intentSubmit();
  else if (command === "intent" && subcommand === "execute") await intentExecute();
  else throw new Error("Usage: research-cloud <verify|schema workspace|taxonomy snapshot|videos list|videos prioritize|video get|mission preflight|transcript get|progress seed|progress status|progress claim|progress heartbeat|progress finish|artifacts archive|artifact download|source cache-lookup|source query-record|source capture-record|intent validate|intent submit|intent execute>");
} catch (error) { console.error(JSON.stringify({ok:false,error:error instanceof Error?error.message:String(error)},null,2)); process.exitCode=1; }
