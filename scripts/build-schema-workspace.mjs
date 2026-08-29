import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { basename, dirname, relative, resolve, sep } from "node:path";
import process from "node:process";
import pg from "pg";

const { Pool } = pg;
const ROOT = resolve(import.meta.dirname, "..");
const WORKSPACE_ROOT = resolve(ROOT, "schema-workspace");
const GENERATED_ROOT = resolve(WORKSPACE_ROOT, "schemas");
const CHECK_ONLY = process.argv.includes("--check");
const SCHEMAS = [
  "public",
  "api",
  "orchestration",
  "evidence",
  "taxonomy",
  "corpus",
  "staging",
  "ranking",
  "research",
];

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
    ssl = sslMode === "disable"
      ? false
      : rootCertificate
        ? { ca: rootCertificate, rejectUnauthorized: true }
        : { rejectUnauthorized: false };
  }
  return new Pool({
    connectionString,
    ssl,
    max: 3,
    statement_timeout: 60_000,
    application_name: "ai-engineer-schema-workspace",
  });
}

function canonical(value) {
  if (Array.isArray(value)) return value.map(canonical);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, canonical(value[key])]));
  }
  return value;
}

function writeAtomic(path, content) {
  mkdirSync(dirname(path), { recursive: true });
  const temporary = `${path}.tmp`;
  try {
    writeFileSync(temporary, content, "utf8");
    renameSync(temporary, path);
  } finally {
    rmSync(temporary, { force: true });
  }
}

function writeJson(path, value) {
  writeAtomic(path, `${JSON.stringify(canonical(value), null, 2)}\n`);
}

function cell(value) {
  if (value === null || value === undefined || value === "") return "—";
  return String(value).replaceAll("|", "\\|").replaceAll("\r", " ").replaceAll("\n", " ");
}

function code(value) {
  if (value === null || value === undefined || value === "") return "—";
  return `\`${String(value).replaceAll("`", "\\`")}\``;
}

function table(headers, rows) {
  if (rows.length === 0) return "_None._\n";
  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.map(cell).join(" | ")} |`),
    "",
  ].join("\n");
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function generatedDigest() {
  const paths = [
    resolve(WORKSPACE_ROOT, "index.md"),
    resolve(WORKSPACE_ROOT, "manifest.json"),
    resolve(WORKSPACE_ROOT, "search-index.json"),
  ];
  function visit(directory) {
    if (!existsSync(directory)) return;
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = resolve(directory, entry.name);
      if (entry.isDirectory()) visit(path);
      else paths.push(path);
    }
  }
  visit(GENERATED_ROOT);
  if (paths.some((path) => !existsSync(path))) return null;
  const hash = createHash("sha256");
  for (const path of paths.sort()) {
    hash.update(relative(WORKSPACE_ROOT, path).replaceAll("\\", "/"));
    hash.update("\0");
    hash.update(readFileSync(path));
    hash.update("\0");
  }
  return hash.digest("hex");
}

function relationFile(relation) {
  return `${relation.kind === "table" || relation.kind === "partitioned_table" || relation.kind === "foreign_table" ? "tables" : "views"}/${relation.name}.md`;
}

function relatedLink(fromSchema, qualifiedName) {
  const [schema, name] = qualifiedName.split(".");
  if (!SCHEMAS.includes(schema) || !name) return code(qualifiedName);
  return `[${code(qualifiedName)}](../../${schema}/tables/${name}.md)`;
}

function renderRelation(relation, columns, constraints, indexes, policies, inbound) {
  const qualified = `${relation.schema}.${relation.name}`;
  const typeGroup = ["table", "partitioned_table", "foreign_table"].includes(relation.kind) ? "Tables" : "Views";
  const relationConstraints = constraints.filter((item) => item.schema === relation.schema && item.relation === relation.name);
  const outbound = relationConstraints.filter((item) => item.type === "foreign_key");
  const relationIndexes = indexes.filter((item) => item.schema === relation.schema && item.relation === relation.name);
  const relationPolicies = policies.filter((item) => item.schema === relation.schema && item.relation === relation.name);
  const incoming = inbound.get(qualified) ?? [];
  const lines = [
    "---",
    `schema: ${relation.schema}`,
    `relation: ${relation.name}`,
    `qualified_name: ${qualified}`,
    `kind: ${relation.kind}`,
    "---",
    "",
    `# ${qualified}`,
    "",
    relation.description || `Database ${relation.kind.replaceAll("_", " ")} ${qualified}.`,
    "",
    "## Quick facts",
    "",
    `- Kind: ${code(relation.kind)}`,
    `- TypeScript row: ${code(`Database["${relation.schema}"]["${typeGroup}"]["${relation.name}"]["Row"]`)}`,
    `- Row-level security: ${relation.rls_enabled ? "enabled" : "disabled"}${relation.rls_forced ? " and forced" : ""}`,
    `- Search tokens: ${code(`${relation.schema} ${relation.name} ${qualified} ${columns.map((column) => column.name).join(" ")}`)}`,
    "",
    "## Columns",
    "",
    table(
      ["#", "Column", "Postgres type", "Nullable", "Default / generated", "Description"],
      columns.map((column) => [
        column.position,
        code(column.name),
        code(column.data_type),
        column.nullable ? "yes" : "no",
        code(column.generated_expression || column.default_expression || (column.identity_kind ? `identity ${column.identity_kind}` : null)),
        column.description,
      ]),
    ),
    "## Constraints",
    "",
    table(
      ["Name", "Type", "Definition", "References"],
      relationConstraints.map((item) => [code(item.name), code(item.type), code(item.definition), item.references ? relatedLink(relation.schema, item.references) : "—"]),
    ),
    "## Relationships",
    "",
    "### Outbound foreign keys",
    "",
    table(["Constraint", "Target", "Definition"], outbound.map((item) => [code(item.name), relatedLink(relation.schema, item.references), code(item.definition)])),
    "### Inbound foreign keys",
    "",
    table(["Source", "Constraint", "Definition"], incoming.map((item) => [relatedLink(relation.schema, `${item.schema}.${item.relation}`), code(item.name), code(item.definition)])),
    "## Indexes",
    "",
    table(["Name", "Definition"], relationIndexes.map((item) => [code(item.name), code(item.definition)])),
    "## RLS policies",
    "",
    table(
      ["Policy", "Mode", "Command", "Roles", "Using", "With check"],
      relationPolicies.map((item) => [code(item.name), item.permissive, code(item.command), code(item.roles.join(", ")), code(item.using_expression), code(item.check_expression)]),
    ),
  ];
  if (relation.definition) lines.push("## View definition", "", "```sql", relation.definition.trim(), "```", "");
  return `${lines.join("\n").trimEnd()}\n`;
}

async function loadMetadata(pool) {
  const [relations, columns, constraints, indexes, policies, functions, enums] = await Promise.all([
    pool.query(`select n.nspname as schema, c.relname as name,
      case c.relkind when 'r' then 'table' when 'p' then 'partitioned_table' when 'v' then 'view'
        when 'm' then 'materialized_view' when 'f' then 'foreign_table' end as kind,
      obj_description(c.oid, 'pg_class') as description,
      c.relrowsecurity as rls_enabled, c.relforcerowsecurity as rls_forced,
      case when c.relkind in ('v','m') then pg_get_viewdef(c.oid, true) end as definition
      from pg_class c join pg_namespace n on n.oid=c.relnamespace
      where n.nspname=any($1) and c.relkind in ('r','p','v','m','f')
      order by n.nspname,c.relname`, [SCHEMAS]),
    pool.query(`select n.nspname as schema,c.relname as relation,a.attnum as position,a.attname as name,
      pg_catalog.format_type(a.atttypid,a.atttypmod) as data_type,not a.attnotnull as nullable,
      pg_get_expr(d.adbin,d.adrelid) as default_expression,
      case a.attidentity when 'a' then 'always' when 'd' then 'by default' end as identity_kind,
      case when a.attgenerated<>'' then pg_get_expr(d.adbin,d.adrelid) end as generated_expression,
      col_description(c.oid,a.attnum) as description
      from pg_attribute a join pg_class c on c.oid=a.attrelid join pg_namespace n on n.oid=c.relnamespace
      left join pg_attrdef d on d.adrelid=a.attrelid and d.adnum=a.attnum
      where n.nspname=any($1) and c.relkind in ('r','p','v','m','f') and a.attnum>0 and not a.attisdropped
      order by n.nspname,c.relname,a.attnum`, [SCHEMAS]),
    pool.query(`select n.nspname as schema,c.relname as relation,con.conname as name,
      case con.contype when 'p' then 'primary_key' when 'f' then 'foreign_key' when 'u' then 'unique'
        when 'c' then 'check' when 'x' then 'exclusion' else con.contype::text end as type,
      pg_get_constraintdef(con.oid,true) as definition,
      case when con.confrelid<>0 then con.confrelid::regclass::text end as references
      from pg_constraint con join pg_class c on c.oid=con.conrelid join pg_namespace n on n.oid=c.relnamespace
      where n.nspname=any($1) order by n.nspname,c.relname,con.contype,con.conname`, [SCHEMAS]),
    pool.query(`select schemaname as schema,tablename as relation,indexname as name,indexdef as definition
      from pg_indexes where schemaname=any($1) order by schemaname,tablename,indexname`, [SCHEMAS]),
    pool.query(`select schemaname as schema,tablename as relation,policyname as name,permissive,cmd as command,
      roles::text[] as roles,qual as using_expression,with_check as check_expression
      from pg_policies where schemaname=any($1) order by schemaname,tablename,policyname`, [SCHEMAS]),
    pool.query(`select n.nspname as schema,p.proname as name,pg_get_function_identity_arguments(p.oid) as arguments,
      pg_get_function_result(p.oid) as returns,
      case p.provolatile when 'i' then 'immutable' when 's' then 'stable' else 'volatile' end as volatility,
      p.prosecdef as security_definer,obj_description(p.oid,'pg_proc') as description
      from pg_proc p join pg_namespace n on n.oid=p.pronamespace
      where n.nspname=any($1) order by n.nspname,p.proname,arguments`, [SCHEMAS]),
    pool.query(`select n.nspname as schema,t.typname as name,array_agg(e.enumlabel::text order by e.enumsortorder) as values
      from pg_type t join pg_namespace n on n.oid=t.typnamespace join pg_enum e on e.enumtypid=t.oid
      where n.nspname=any($1) group by n.nspname,t.typname order by n.nspname,t.typname`, [SCHEMAS]),
  ]);
  return {
    relations: relations.rows,
    columns: columns.rows,
    constraints: constraints.rows,
    indexes: indexes.rows,
    policies: policies.rows,
    functions: functions.rows,
    enums: enums.rows,
  };
}

function buildWorkspace(metadata) {
  const relativeGenerated = relative(WORKSPACE_ROOT, GENERATED_ROOT);
  if (relativeGenerated.startsWith(`..${sep}`) || basename(GENERATED_ROOT) !== "schemas") {
    throw new Error(`Unsafe generated workspace path: ${GENERATED_ROOT}`);
  }
  rmSync(GENERATED_ROOT, { recursive: true, force: true });
  mkdirSync(GENERATED_ROOT, { recursive: true });

  const inbound = new Map();
  for (const item of metadata.constraints.filter((constraint) => constraint.type === "foreign_key" && constraint.references)) {
    const target = item.references.includes(".") ? item.references : `${item.schema}.${item.references}`;
    const normalized = target.replaceAll('"', "");
    const list = inbound.get(normalized) ?? [];
    list.push(item);
    inbound.set(normalized, list);
  }

  const search = [];
  for (const schema of SCHEMAS) {
    const schemaRoot = resolve(GENERATED_ROOT, schema);
    const relations = metadata.relations.filter((item) => item.schema === schema);
    const schemaFunctions = metadata.functions.filter((item) => item.schema === schema);
    const schemaEnums = metadata.enums.filter((item) => item.schema === schema);
    const tableRelations = relations.filter((item) => ["table", "partitioned_table", "foreign_table"].includes(item.kind));
    const viewRelations = relations.filter((item) => !tableRelations.includes(item));

    for (const relation of relations) {
      const columns = metadata.columns.filter((item) => item.schema === schema && item.relation === relation.name);
      const path = resolve(schemaRoot, relationFile(relation));
      writeAtomic(path, renderRelation(relation, columns, metadata.constraints, metadata.indexes, metadata.policies, inbound));
      const related = metadata.constraints
        .filter((item) => item.schema === schema && item.relation === relation.name && item.references)
        .map((item) => item.references);
      search.push({
        schema,
        name: relation.name,
        qualified_name: `${schema}.${relation.name}`,
        kind: relation.kind,
        description: relation.description,
        columns: columns.map((item) => item.name),
        related_relations: related,
        path: `schemas/${schema}/${relationFile(relation)}`,
      });
    }

    writeAtomic(resolve(schemaRoot, "functions.md"), [
      `# ${schema} functions`, "",
      table(["Function", "Arguments", "Returns", "Volatility", "Security", "Description"], schemaFunctions.map((item) => [
        code(item.name), code(item.arguments), code(item.returns), item.volatility,
        item.security_definer ? "security definer" : "security invoker", item.description,
      ])),
    ].join("\n"));

    writeAtomic(resolve(schemaRoot, "enums.md"), [
      `# ${schema} enums`, "",
      table(["Enum", "Values"], schemaEnums.map((item) => [code(item.name), item.values.map(code).join(", ")])),
    ].join("\n"));

    const schemaIndex = [
      `# ${schema} schema`, "",
      `Searchable inventory for ${code(schema)}. Every relation has a dedicated file containing columns, constraints, inbound and outbound relationships, indexes, and RLS policies.`, "",
      `- Tables: ${tableRelations.length}`,
      `- Views: ${viewRelations.length}`,
      `- Functions: [${schemaFunctions.length}](functions.md)`,
      `- Enums: [${schemaEnums.length}](enums.md)`, "",
      "## Tables", "",
      table(["Relation", "Columns", "RLS", "Description"], tableRelations.map((item) => {
        const count = metadata.columns.filter((column) => column.schema === schema && column.relation === item.name).length;
        return [`[${code(item.name)}](${relationFile(item)})`, count, item.rls_enabled ? "enabled" : "disabled", item.description];
      })),
      "## Views", "",
      table(["Relation", "Columns", "Description"], viewRelations.map((item) => {
        const count = metadata.columns.filter((column) => column.schema === schema && column.relation === item.name).length;
        return [`[${code(item.name)}](${relationFile(item)})`, count, item.description];
      })),
    ].join("\n");
    writeAtomic(resolve(schemaRoot, "README.md"), `${schemaIndex.trimEnd()}\n`);

    writeJson(resolve(schemaRoot, "schema.json"), {
      schema,
      relations,
      columns: metadata.columns.filter((item) => item.schema === schema),
      constraints: metadata.constraints.filter((item) => item.schema === schema),
      indexes: metadata.indexes.filter((item) => item.schema === schema),
      policies: metadata.policies.filter((item) => item.schema === schema),
      functions: schemaFunctions,
      enums: schemaEnums,
    });
  }

  writeJson(resolve(WORKSPACE_ROOT, "search-index.json"), search);
  writeJson(resolve(WORKSPACE_ROOT, "manifest.json"), {
    format: "ai-engineer-schema-workspace/2",
    schemas: SCHEMAS.map((schema) => ({
      name: schema,
      relations: metadata.relations.filter((item) => item.schema === schema).length,
      path: `schemas/${schema}/README.md`,
    })),
    totals: {
      schemas: SCHEMAS.length,
      relations: metadata.relations.length,
      columns: metadata.columns.length,
      constraints: metadata.constraints.length,
      indexes: metadata.indexes.length,
      policies: metadata.policies.length,
      functions: metadata.functions.length,
      enums: metadata.enums.length,
    },
  });

  const index = [
    "# AI Engineer Postgres schema workspace", "",
    "Generated, search-first projection of the live Supabase database. Start with the schema index, search `search-index.json`, or use `rg` against the per-relation Markdown files.", "",
    "The canonical migration and TypeScript contract is `@aiengineer/database-contract`; the synchronized cloud type file is [`database.types.ts`](../database.types.ts).", "",
    "## Drill-down map", "",
    table(["Schema", "Relations", "Purpose"], SCHEMAS.map((schema) => {
      const purpose = {
        public: "Starter videos and pre-research pipeline",
        api: "Stable application-facing views and functions",
        orchestration: "Missions, work leases, intents, receipts, and artifacts",
        evidence: "Sources, captures, locators, claims, and verification",
        taxonomy: "Versioned facets, terms, relations, and assignments",
        corpus: "Canonical industry entities",
        staging: "Candidates, mentions, identity resolution, and vetting",
        ranking: "Metric definitions, observations, features, and scores",
        research: "Bundles, reports, findings, comparisons, and handoffs",
      }[schema];
      const count = metadata.relations.filter((item) => item.schema === schema).length;
      return [`[${code(schema)}](schemas/${schema}/README.md)`, count, purpose];
    })),
    "## Fast searches", "",
    "```bash",
    "rg -n \"metric_observation|github_stars|quality_flags\" schema-workspace/schemas/ranking",
    "rg -n \"FOREIGN KEY.*corpus.organization\" schema-workspace/schemas",
    "rg -n \"security definer|RLS policies\" schema-workspace/schemas",
    "jq '.[] | select(.columns | index(\"video_id\"))' schema-workspace/search-index.json",
    "```", "",
    "Run `npm run schema:workspace` to rebuild from live Postgres. Run `npm run schema:workspace:check` in CI to rebuild and fail when the committed workspace has drifted.", "",
    "See [READINESS_AUDIT.md](READINESS_AUDIT.md) for the design audit and [taxonomy.snapshot.json](taxonomy.snapshot.json) for current grouping terms.", "",
  ].join("\n");
  writeAtomic(resolve(WORKSPACE_ROOT, "index.md"), index);

  const digestInput = readFileSync(resolve(WORKSPACE_ROOT, "search-index.json"));
  return { schemas: SCHEMAS.length, relations: metadata.relations.length, files: metadata.relations.length + (SCHEMAS.length * 4) + 3, search_index_sha256: sha256(digestInput) };
}

loadEnvironment();
const before = CHECK_ONLY ? generatedDigest() : null;
const pool = dbPool();
try {
  const metadata = await loadMetadata(pool);
  const result = buildWorkspace(metadata);
  const after = CHECK_ONLY ? generatedDigest() : null;
  if (CHECK_ONLY && before !== after) {
    process.stderr.write("Schema workspace was stale and has been regenerated. Review and commit the changes.\n");
    process.exitCode = 1;
  }
  process.stdout.write(`${JSON.stringify({ ok: true, output: WORKSPACE_ROOT, ...result }, null, 2)}\n`);
} finally {
  await pool.end();
}
