import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import process from "node:process";
import pg from "pg";
import { createClient } from "@supabase/supabase-js";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const { Pool } = pg;
const ROOT = resolve(import.meta.dirname, "..");
const BUCKET = "ai-engineer-cloud-bucket";
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
function assertApply() { if (!has("--apply")) throw new Error("Mutation refused: rerun with --apply after reviewing the plan"); }
function quoteIdent(value) { if (!/^[a-z][a-z0-9_]*$/.test(value)) throw new Error(`Unsafe identifier: ${value}`); return `"${value}"`; }

const MUTABLE_TABLES = new Set([
  "corpus.organization", "corpus.organization_identifier", "corpus.person", "corpus.person_identifier",
  "corpus.repository", "corpus.repository_alias", "corpus.library", "corpus.paper", "corpus.video",
  "corpus.talk", "corpus.product", "corpus.concept", "corpus.dataset", "corpus.benchmark",
  "corpus.ai_model", "corpus.ai_model_version", "corpus.ai_protocol", "corpus.ai_protocol_version",
  "corpus.mcp_server", "corpus.agent_skill", "corpus.case_study",
  "staging.candidate", "staging.candidate_library", "staging.candidate_repository", "staging.candidate_person",
  "staging.candidate_organization", "staging.candidate_paper", "staging.candidate_video", "staging.candidate_talk",
  "staging.candidate_product", "staging.candidate_concept", "staging.candidate_dataset", "staging.candidate_benchmark",
  "staging.candidate_ai_model", "staging.candidate_case_study", "staging.mention", "staging.identity_match",
  "staging.resolution_decision", "staging.vetting_decision", "evidence.source", "evidence.source_capture",
  "evidence.locator", "evidence.extraction_signature", "evidence.claim", "evidence.claim_evidence_link",
  "evidence.claim_library", "evidence.claim_repository", "evidence.claim_person", "evidence.claim_organization",
  "evidence.claim_paper", "evidence.claim_talk", "evidence.claim_video", "evidence.claim_product",
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
      to_regclass('corpus.case_study') is not null as case_studies,
      (select count(*) from information_schema.columns where table_schema='ranking' and table_name='metric_observation'
        and column_name in ('dataset_id','benchmark_id','talk_id','ai_model_id','case_study_id')) = 5 as metric_targets,
      (select count(*) from information_schema.columns where table_schema='ranking' and table_name='metric_observation'
        and column_name in ('collected_at','dimensions','raw_capture_id','quality_flags','unavailable_reason')) = 5 as metric_provenance`);
    const { data: buckets, error } = await supabase.storage.listBuckets();
    if (error) throw error;
    const bucket = buckets.find((item) => item.id === BUCKET);
    output({ ok: Object.values(row).every(Boolean) && bucket?.public === false, database: row, storage: { bucket: BUCKET, exists: Boolean(bucket), private: bucket ? !bucket.public : null } });
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
    const { rows } = await pool.query(`select v.video_id, v.title, v.published_at, v.duration_seconds,
      v.pre_research_complete, s.pipeline_status, s.latest_run_id
      from public.research_starter_videos v
      left join public.research_pre_research_video_state s using (video_id)
      order by v.published_at ${order === "asc" ? "asc" : "desc"} nulls last, v.video_id
      limit $1`, [limit]);
    output({ count: rows.length, order, videos: rows });
  } finally { await pool.end(); }
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
    output({ video: video.rows[0] ?? null, runs: analyses.rows, entity_candidates: entities.rows, organizations: organizations.rows, organization_sources: sources.rows, pre_research_artifacts: artifacts.rows });
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
  if (!has("--apply")) return output({ dry_run: true, ...plan });
  const pool = dbPool(); const client = await pool.connect();
  try {
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
      await client.query(`insert into orchestration.work_item_event(work_item_id,event_type,actor,payload) values($1,'created',$2,$3)`, [ids[key], flag("--actor","workspace-seeder"), JSON.stringify({ video_id: videoId, key })]);
    }
    for (const [key,, depends] of WORK_GRAPH) for (const dep of depends) await client.query(`insert into orchestration.work_item_dependency(work_item_id,depends_on_id) values($1,$2) on conflict do nothing`, [ids[key], ids[dep]]);
    await client.query("commit"); output({ ok: true, mission_id: mission.rows[0].id, work_items: ids });
  } catch (error) { await client.query("rollback"); throw error; } finally { client.release(); await pool.end(); }
}

async function progressClaim() {
  assertApply(); const worker = required("--worker"); const leaseSeconds = Math.min(Number(flag("--lease-seconds","1800")), 7200);
  const pool=dbPool(); const client=await pool.connect();
  try { await client.query("begin");
    const result=await client.query(`with candidate as (
      select w.id from orchestration.work_item w where
        (w.status='ready' or (w.status='running' and w.lease_expires_at<now()))
        and not exists (select 1 from orchestration.work_item_dependency d join orchestration.work_item p on p.id=d.depends_on_id where d.work_item_id=w.id and p.status<>'succeeded')
      order by w.created_at for update skip locked limit 1)
      update orchestration.work_item w set status='running',lease_owner=$1,lease_expires_at=now()+make_interval(secs=>$2),heartbeat_at=now(),attempt_count=attempt_count+1
      from candidate c where w.id=c.id returning w.*`, [worker,leaseSeconds]);
    if (!result.rows[0]) { await client.query("commit"); return output({ ok:true,claimed:null }); }
    const w=result.rows[0];
    const attempt=await client.query(`insert into orchestration.attempt(work_item_id,attempt_no,agent_deployment_id) values($1,$2,$3) returning id`, [w.id,w.attempt_count,worker]);
    await client.query(`insert into orchestration.work_item_event(work_item_id,attempt_id,event_type,actor,payload) values($1,$2,'claimed',$3,$4)`,[w.id,attempt.rows[0].id,worker,JSON.stringify({lease_seconds:leaseSeconds})]);
    await client.query("commit"); output({ok:true,claimed:{...w,attempt_id:attempt.rows[0].id}});
  } catch(error){await client.query("rollback");throw error;} finally{client.release();await pool.end();}
}

async function progressHeartbeat() {
  assertApply(); const worker=required("--worker"), workItem=required("--work-item"); const leaseSeconds=Math.min(Number(flag("--lease-seconds","1800")),7200); const pool=dbPool();
  try { const result=await pool.query(`update orchestration.work_item set heartbeat_at=now(),lease_expires_at=now()+make_interval(secs=>$3) where id=$1 and status='running' and lease_owner=$2 returning id,lease_expires_at`,[workItem,worker,leaseSeconds]); if(!result.rows[0]) throw new Error("Lease not owned by worker or no longer running"); await pool.query(`insert into orchestration.work_item_event(work_item_id,event_type,actor,payload) values($1,'heartbeat',$2,$3)`,[workItem,worker,JSON.stringify({lease_seconds:leaseSeconds})]); output({ok:true,...result.rows[0]}); } finally{await pool.end();}
}

async function progressFinish() {
  assertApply(); const worker=required("--worker"), workItem=required("--work-item"), attemptId=required("--attempt-id"), outcome=flag("--outcome","succeeded");
  if(!["succeeded","failed","blocked"].includes(outcome)) throw new Error("--outcome must be succeeded, failed, or blocked");
  const payloadPath=flag("--payload-file"); const payload=payloadPath?JSON.parse(readFileSync(resolve(payloadPath),"utf8")):{}; const pool=dbPool(); const client=await pool.connect();
  try{await client.query("begin"); const terminal=outcome==="blocked"?"blocked":outcome; const attemptOutcome=outcome==="blocked"?"failed":outcome;
    const updated=await client.query(`update orchestration.work_item set status=$3,terminal_evidence=$4,lease_owner=null,lease_expires_at=null,heartbeat_at=null where id=$1 and lease_owner=$2 and status='running' returning id`,[workItem,worker,terminal,JSON.stringify(payload)]); if(!updated.rows[0]) throw new Error("Lease not owned by worker or no longer running");
    await client.query(`update orchestration.attempt set outcome=$2,ended_at=now() where id=$1 and work_item_id=$3`,[attemptId,attemptOutcome,workItem]);
    await client.query(`insert into orchestration.work_item_event(work_item_id,attempt_id,event_type,actor,payload) values($1,$2,$3,$4,$5)`,[workItem,attemptId,outcome,worker,JSON.stringify(payload)]); await client.query("commit"); output({ok:true,work_item_id:workItem,outcome});
  }catch(error){await client.query("rollback");throw error;}finally{client.release();await pool.end();}
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
  else if (command === "video" && subcommand === "get") await videoGet();
  else if (command === "taxonomy" && subcommand === "snapshot") await taxonomySnapshot();
  else if (command === "progress" && subcommand === "seed") await progressSeed();
  else if (command === "progress" && subcommand === "claim") await progressClaim();
  else if (command === "progress" && subcommand === "heartbeat") await progressHeartbeat();
  else if (command === "progress" && subcommand === "finish") await progressFinish();
  else if (command === "intent" && subcommand === "validate") await intentValidate();
  else if (command === "intent" && subcommand === "submit") await intentSubmit();
  else if (command === "intent" && subcommand === "execute") await intentExecute();
  else throw new Error("Usage: research-cloud <verify|schema workspace|taxonomy snapshot|videos list|video get|progress seed|progress claim|progress heartbeat|progress finish|intent validate|intent submit|intent execute>");
} catch (error) { console.error(JSON.stringify({ok:false,error:error instanceof Error?error.message:String(error)},null,2)); process.exitCode=1; }
