import express from 'express';
import mongoose from 'mongoose';

const app = express()

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/whiteboardsdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

console.log('About to listen on port 3000');

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});