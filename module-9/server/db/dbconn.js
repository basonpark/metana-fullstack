import mongoose from 'mongoose';
import { MONGO_URI } from '../config.js';

export async function connectToDatabase() {
  try {
    console.log('connecting to mongo database...');
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process with failure
  }
}
