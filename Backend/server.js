require('dotenv').config();

const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001; // Choose a port for your backend

// Middleware
app.use(cors());
app.use(bodyParser.json());

// PostgreSQL pool configuration using environment variables
const pool = new Pool({
  user: process.env.DB_USER, // Accessing DB_USER from .env
  host: process.env.DB_HOST, // Accessing DB_HOST from .env
  database: process.env.DB_DATABASE, // Accessing DB_DATABASE from .env
  password: process.env.DB_PASSWORD, // Accessing DB_PASSWORD from .env
  port: process.env.DB_PORT, // Accessing DB_PORT from .env
});
pool.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Database connection error:', err));



app.post('/submit', async (req, res) => {
    const { username, email, password, gender, hobbies, country } = req.body;
  
    try {
      const result = await pool.query(
        'INSERT INTO info (username,email, password, gender, hobbies, country) VALUES ($1, $2, $3, $4, $5, $6)',
        [username, email, password, gender, hobbies, country] // Convert hobbies array to string
      );
      res.status(201).send('Data saved successfully');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error saving data');
    }
  });

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });