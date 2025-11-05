import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.ATLAS_URI);

async function connectDB() {
  try {
    await client.connect();
    const db = client.db('HuskyFilmFestival');
    console.log('Connected to MongoDB Atlas');
    return db;
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}

export { connectDB };