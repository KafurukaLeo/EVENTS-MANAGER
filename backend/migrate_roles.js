import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString: 'postgresql://postgres:leo@ABC2025!!@localhost:5432/event_management'
});

const run = async () => {
  const res = await pool.query(
    `UPDATE users SET role = 'eventmanager' WHERE role IN ('ORGANIZER', 'organizer')`
  );
  console.log('Updated rows:', res.rowCount);
  await pool.end();
};

run().catch(err => { console.error(err); process.exit(1); });
