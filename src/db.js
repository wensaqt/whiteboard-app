import mongoose from 'mongoose';

const url = 'mongodb://localhost:27017/whiteboardsdb';

export async function connectToDatabase() {
  try {
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Database Connected');
  } catch (err) {
    console.log('Database Connection Error:', err);
  }
};