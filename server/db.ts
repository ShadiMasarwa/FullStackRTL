import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import dotenv from 'dotenv';

dotenv.config();

let mongoServer: MongoMemoryServer | null = null;

export async function connectDB() {
  try {
    const isProduction = process.env.NODE_ENV === 'production';
    let uri: string;

    if (isProduction && process.env.MONGODB_URI) {
      uri = process.env.MONGODB_URI;
    } else {
      console.log('🚀 Starting MongoDB Memory Server...');
      mongoServer = await MongoMemoryServer.create();
      uri = mongoServer.getUri();
      console.log(`📦 MongoDB Memory Server URI: ${uri}`);
    }

    await mongoose.connect(uri);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}

export async function disconnectDB() {
  try {
    await mongoose.disconnect();
    if (mongoServer) {
      await mongoServer.stop();
      mongoServer = null;
    }
    console.log('MongoDB disconnected');
  } catch (error) {
    console.error('MongoDB disconnect error:', error);
  }
}
