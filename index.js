import express from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
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
  connectionString: process.env.DB_CONNECTION_STRING,
});

// Middleware to parse JSON requests
app.use(express.json());

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
  
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach user info to the request
      next();
    } catch (err) {
      return res.status(400).json({ message: 'Invalid or expired token.' });
    }
  };

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
  
    // Check if username already exists
    const existingUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Username already taken' });
    }
  
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  
    // Store the new user in the database
    const result = await pool.query(
      'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING *',
      [username, hashedPassword]
    );
  
    const newUser = result.rows[0];
    res.status(201).json({
      message: 'User registered successfully',
      user: { id: newUser.id, username: newUser.username },
    });
  });



app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Check if user exists
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT
    const payload = { userId: user.id, username: user.username };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
        message: 'Login successful',
        token: token,
    });
});

app.post('/add-url', verifyToken, async (req, res) => {
    const { url } = req.body;
  
    // Ensure URL is valid
    if (!url || !/^https?:\/\/[^\s]+$/.test(url)) {
      return res.status(400).json({ message: 'Invalid URL' });
    }
  
    // Add URL to the user's collection
    const result = await pool.query(
      'UPDATE users SET urls = array_append(urls, $1) WHERE id = $2 RETURNING urls',
      [url, req.user.userId]
    );
  
    res.json({
      message: 'URL added successfully',
      urls: result.rows[0].urls,
    });
  });

app.get('/my-data', verifyToken, async (req, res) => {
    const result = await pool.query(
        'SELECT username, urls FROM users WHERE id = $1',
        [req.user.userId]
    );

    res.json({ 
      myusername: result.rows[0].username,
      myurls: result.rows[0].urls
     });

});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});