import pg from 'pg';
import bcrypt from 'bcryptjs';

const { Pool } = pg;

const pool = new Pool({
  connectionString: 'postgresql://postgres:leo@ABC2025!!@localhost:5432/event_management'
});

const seed = async () => {
  const email = 'admin@eventmanager.com';
  const password = 'Admin@1234';
  const name = 'Super Admin';
  const role = 'admin';

  // Check if admin already exists
  const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
  if (existing.rows.length > 0) {
    console.log('Admin user already exists:', email);
    await pool.end();
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role`,
    [name, email, hashedPassword, role]
  );

  console.log('✅ Admin user created:');
  console.table(result.rows);
  console.log('\nLogin credentials:');
  console.log('  Email   :', email);
  console.log('  Password:', password);

  await pool.end();
};

seed().catch(err => { console.error(err); process.exit(1); });
