import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString: 'postgresql://postgres:leo@ABC2025!!@localhost:5432/event_management'
});

const run = async () => {
  // Remove admin user
  const del = await pool.query(`DELETE FROM users WHERE role = 'admin' RETURNING id, name, email, role`);
  console.log('Removed admin users:', del.rowCount);
  if (del.rows.length) console.table(del.rows);

  // Show current users
  const res = await pool.query('SELECT id, name, email, role FROM users ORDER BY id');
  console.log('\nCurrent users:');
  console.table(res.rows);

  await pool.end();
};

run().catch(err => { console.error(err); process.exit(1); });
