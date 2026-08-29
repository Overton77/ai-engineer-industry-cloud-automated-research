import { randomUUID } from "node:crypto";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import pg from "pg";

const ROOT=resolve(import.meta.dirname,"..");
const envPath=process.env.AI_ENGINEER_ENV_FILE??resolve(ROOT,".env");
if(existsSync(envPath)&&typeof process.loadEnvFile==="function")process.loadEnvFile(envPath);

const configured=process.env.POSTGRES_URL_NON_POOLING??process.env.POSTGRES_URL;
if(!configured)throw new Error("POSTGRES_URL_NON_POOLING or POSTGRES_URL is required");
let connectionString=configured,ssl;
const rootCertificate=process.env.POSTGRES_SSL_ROOT_CERT?.replaceAll("\\n","\n"),sslMode=process.env.POSTGRES_SSL_MODE;
if(rootCertificate||sslMode==="no-verify"||sslMode==="disable"){
  const parsed=new URL(configured);parsed.searchParams.delete("sslmode");connectionString=parsed.toString();
  ssl=sslMode==="disable"?false:(rootCertificate?{ca:rootCertificate,rejectUnauthorized:true}:{rejectUnauthorized:false});
}
const pool=new pg.Pool({connectionString,ssl,max:4,statement_timeout:30_000,application_name:"ai-engineer-parallel-claim-proof"});
const suffix=randomUUID(),missionIds=[];

async function createMission(label){
  const client=await pool.connect();try{await client.query("begin");
    const mission=(await client.query(`insert into orchestration.mission(slug,goal,status,started_at) values($1,$2,'running',now()) returning id`,[`verification:parallel-claim:${suffix}:${label}`,`Ephemeral parallel claim verification ${label}`])).rows[0];
    missionIds.push(mission.id);
    const work=(await client.query(`insert into orchestration.work_item(mission_id,kind,status,idempotency_key) values($1,'select_entities','ready',$2) returning id`,[mission.id,`verification:parallel-claim:${suffix}:${label}:work`])).rows[0];
    await client.query("commit");return {missionId:mission.id,workItemId:work.id};
  }catch(error){await client.query("rollback");throw error;}finally{client.release();}
}

async function claim(missionId,worker){
  const client=await pool.connect();try{await client.query("begin");
    const result=await client.query(`with candidate as (
      select w.id from orchestration.work_item w
      where w.mission_id=$1 and w.status='ready' and w.attempt_count<w.max_attempts
      order by w.created_at,w.id for update of w skip locked limit 1
    ) update orchestration.work_item w set status='running',lease_owner=$2,lease_expires_at=now()+interval '5 minutes',heartbeat_at=now(),attempt_count=attempt_count+1
      from candidate c where w.id=c.id returning w.id`,[missionId,worker]);
    await client.query("commit");return result.rows[0]?.id??null;
  }catch(error){await client.query("rollback");throw error;}finally{client.release();}
}

try{
  const first=await createMission("same-scope"),second=await createMission("isolation");
  const raced=await Promise.all([claim(first.missionId,`proof:${suffix}:a`),claim(first.missionId,`proof:${suffix}:b`)]);
  if(raced.filter(Boolean).length!==1||raced.find(Boolean)!==first.workItemId)throw new Error(`Expected exactly one same-mission winner; got ${JSON.stringify(raced)}`);
  const wrongScope=await claim(first.missionId,`proof:${suffix}:c`);
  const secondStatus=(await pool.query(`select status from orchestration.work_item where id=$1`,[second.workItemId])).rows[0]?.status;
  if(wrongScope!==null||secondStatus!=="ready")throw new Error("Mission scope isolation failed");
  process.stdout.write(`${JSON.stringify({ok:true,same_mission_claims:raced,exactly_one_winner:true,cross_mission_claim:null,other_mission_status:secondStatus},null,2)}\n`);
}finally{
  if(missionIds.length)await pool.query(`delete from orchestration.mission where id=any($1::uuid[])`,[missionIds]);
  await pool.end();
}
