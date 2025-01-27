// src/utils/connectToDB.ts
import mongoose from 'mongoose';

// Your MongoDB connection string (ensure you replace this with your actual string)
const MONGO_URI = 'mongodb+srv://sthembisobuthelezi774:Sthe.1996@cluster0.enwuc.mongodb.net/';

const connectToDB = async () => {
  try {
    // Connect to MongoDB using the connection string
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); 
  }
};

export default connectToDB;
