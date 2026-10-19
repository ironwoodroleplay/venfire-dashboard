// Run from the dashboard directory: node --env-file=.env.local setup-training-office.cjs
const {Pool}=require('pg');
const pool=new Pool({connectionString:process.env.DATABASE_URL});
(async()=>{try{await pool.query('ALTER TABLE training_logs ADD COLUMN IF NOT EXISTS office TEXT');console.log('Training office database migration complete.');}catch(error){console.error(error);process.exitCode=1;}finally{await pool.end();}})();
