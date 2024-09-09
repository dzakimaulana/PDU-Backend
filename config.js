const { Pool } = require('pg');
require('dotenv').config();

const connectDB = async () => {
  const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
  });
  
  try {
    const client = await pool.connect();
    console.log('Connect to PostgreSQL database successfully');
    client.release();

    return pool;
  }
  catch (err) {
    console.error('Error connecting to the database:', err.message);
    process.exit(1);
  }
}

module.exports = connectDB;