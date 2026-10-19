// Run from dashboard: node --env-file=.env.local setup-loa-role.cjs
const {Pool}=require('pg');
const db=new Pool({connectionString:process.env.DATABASE_URL});
(async()=>{try{await db.query(`ALTER TABLE loa_requests DROP CONSTRAINT IF EXISTS loa_requests_status_check; ALTER TABLE loa_requests ADD CONSTRAINT loa_requests_status_check CHECK(status IN ('pending','approved','denied','ended'));`);console.log('LOA role migration complete.');}catch(e){console.error(e);process.exitCode=1;}finally{await db.end();}})();
