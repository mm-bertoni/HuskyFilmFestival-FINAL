import dotenv from 'dotenv';
dotenv.config({path: './config.env'})
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.ATLAS_URI);

let db;

async function connectDB() {
  if (!db) {
    await client.connect();
    db = client.db("HuskyFilmFestival");
    console.log("Connected to MongoDB Atlas");
  }
  return db;
}