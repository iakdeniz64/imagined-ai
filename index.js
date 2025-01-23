import express from 'express';
import dotenv from 'dotenv';
import pg from 'pg';
import cors from 'cors';

// Load environment variables
dotenv.config();

// Initialize the Express app
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

// Initialize the PostgreSQL pool
const pool = new pg.Pool({
  connectionString: process.env.DB_CONNECTION_STRING, // Assuming you set up the DATABASE_URL in .env
});

// Middleware to parse JSON requests
app.use(express.json());

// Endpoint to check users table
app.get('/users', async (req, res) => {
  try {
    // Query the users table
    const result = await pool.query('SELECT * FROM users');

    // Send the result as JSON
    res.json(result.rows); // The rows contain the user data
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Error fetching users');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});