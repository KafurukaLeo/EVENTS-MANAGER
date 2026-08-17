import pg from 'pg';

const { Client } = pg;

const createDb = async () => {
  const client = new Client({
    connectionString: 'postgresql://postgres:leo@ABC2025!!@localhost:5432/postgres'
  });
  
  try {
    await client.connect();
    await client.query('CREATE DATABASE event_management');
    console.log('Database event_management created successfully!');
  } catch (err) {
    if (err.code === '42P04') {
      console.log('Database already exists.');
    } else {
      console.error('Error creating database:', err);
    }
  } finally {
    await client.end();
  }
};

createDb();
