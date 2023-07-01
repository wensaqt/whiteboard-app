import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import User from './User.js';

// Create a new Express application
const app = express()

// Use JSON parser for incoming requests
app.use(express.json());

// Use CORS middleware for handling cross-origin requests
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Connect to the MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/whiteboardsdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

/**
 * Root GET endpoint - responds with a hello world message
 */
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

/**
 * POST endpoint for user registration
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  const user = new User({ username, email, password });
  user.save()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

console.log('About to listen on port 3000');

/**
 * Start the server and listen on port 3000
 */
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});