import express from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import pg from 'pg';
import cors from 'cors';
import OpenAI from 'openai';
import imgbbUploader from 'imgbb-uploader'


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

const pool = new pg.Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(express.json());

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).json({ message: 'Invalid or expired token.' });
  }
};

app.post("/generate-image", async (req, res) => {
  try {
      const { selectionName, typeOfContent } = req.body;

      if (!selectionName || !typeOfContent) {
          return res.status(400).json({ error: "Missing required fields" });
      }

      const response = await openai.images.generate({
          prompt: `${selectionName} ${typeOfContent}`,
          n: 1,
          size: "512x512",
      });

      console.log("OpenAI Response:", response);

      res.json(response);
  } catch (error) {
      console.error("Error generating image:", error);
      res.status(500).json({ error: error.message });
  }
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
  
    const existingUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Username already taken' });
    }
  
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  
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

    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = { userId: user.id, username: user.username };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
        message: 'Login successful',
        token: token,
    });
});

app.post('/add-url', verifyToken, async (req, res) => {
  const { url } = req.body;
  const { username } = req.user; // Get the username from the decoded JWT payload

  // Validate the URL format
  if (!url || !/^https?:\/\/[^\s]+$/.test(url)) {
      return res.status(400).json({ message: 'Invalid URL' });
  }

  try {
      const result = await pool.query(
          'UPDATE users SET urls = array_append(urls, $1) WHERE username = $2 RETURNING urls',
          [url, username]
      );

      if (result.rowCount === 0) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.json({
          message: 'URL added successfully',
          urls: result.rows[0].urls,
      });
  } catch (error) {
      console.error("Error adding URL:", error);
      res.status(500).json({ message: 'Server error' });
  }
});

  //add also del-url


app.post('/upload', verifyToken, async(req, res) => {
  const { imageUrl } = req.body
  console.log(imageUrl, "printing imageurl from index.js")


  if (!imageUrl){
    return res.status(400).send('No image URL provided.')
  }

  const apiKey = process.env.IMG_BB_API_KEY;
  console.log(imageUrl, "Printing imageUrl from within index.js")

  imgbbUploader({
    apiKey: apiKey, 
    imageUrl: imageUrl})
  .then((response) => {
    res.json({
      success: true,
      message: 'Image uploaded successfully',
      data: response,
    })
  })
  .catch((error) => {
    console.error('Image upload failed:', error);
    res.status(500).send('Image upload failed');
  })
})


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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});