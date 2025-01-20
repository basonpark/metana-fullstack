import mongoose from 'mongoose';
import { MONGO_URI } from '../config.js';

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDb connection error:', error);
    process.exit(1);
  }
};

export const disconnectFromDatabase = async () => {
  await mongoose.connection.close();
  console.log('MongoDB disconnected');
}