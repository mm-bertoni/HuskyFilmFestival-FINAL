import dotenv from 'dotenv';
dotenv.config();

import { MongoClient } from 'mongodb';

const connectionString = process.env.ATLAS_URI || 'mongodb://localhost:27017/HuskyFilmFestival';
const client = new MongoClient(connectionString);

let db;

async function connectDB() {
  if (db) return db; // Return existing connection
  
  try {
    await client.connect();
    db = client.db('HuskyFilmFestival');
    console.log('✅ Connected to MongoDB');
    return db;
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    throw err;
  }
}

export { connectDB };