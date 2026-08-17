import pg from 'pg';

const { Client } = pg;

const createTables = async () => {
  const client = new Client({
    connectionString: 'postgresql://postgres:leo@ABC2025!!@localhost:5432/event_management'
  });
  
  try {
    await client.connect();
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'guest',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    console.log('Tables created successfully!');
  } catch (err) {
    console.error('Error creating tables:', err);
  } finally {
    await client.end();
  }
};

createTables();
