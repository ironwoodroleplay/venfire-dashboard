const fs = require('node:fs');
const path = require('node:path');
const {Pool} = require('pg');
if (!process.env.DATABASE_URL) {console.error('DATABASE_URL missing from .env.local');process.exit(1);}
const pool = new Pool({connectionString:process.env.DATABASE_URL});
(async()=>{try{await pool.query(fs.readFileSync(path.join(__dirname,'migration-ticket-transcripts.sql'),'utf8'));console.log('Ticket transcript storage is ready.');}catch(e){console.error(e);process.exitCode=1;}finally{await pool.end();}})();
