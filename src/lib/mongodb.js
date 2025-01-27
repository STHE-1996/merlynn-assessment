// lib/mongodb.js
import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb+srv://sthembisobuthelezi774:Sthe.1996@cluster0.enwuc.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db;

export const connectToDatabase = async () => {
  if (db) return db;

  await client.connect();
  db = client.db('your_database_name'); // Change to your database name
  return db;
};
