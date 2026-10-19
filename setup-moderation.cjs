const fs = require('node:fs');
const path = require('node:path');
const { Client } = require('pg');

(async () => {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required');
  // Works when dashboard is extracted alone or inside the full project.
  const candidates = [
    path.join(__dirname, 'migration-moderation.sql'),
    path.join(__dirname, 'database', 'migration-moderation.sql'),
    path.join(__dirname, '..', 'database', 'migration-moderation.sql'),
  ];
  const sqlPath = candidates.find(file => fs.existsSync(file));
  if (!sqlPath) throw new Error('Cannot find migration-moderation.sql. Keep it next to setup-moderation.cjs.');
  const client = new Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  await client.connect();
  try {
    await client.query(fs.readFileSync(sqlPath, 'utf8'));
    console.log('Moderation migration completed.');
  } finally {
    await client.end();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
