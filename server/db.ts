import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import dotenv from 'dotenv';

dotenv.config();

let mongoServer: MongoMemoryServer | null = null;
let isSeeded = false;

export async function connectDB() {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log('📡 MongoDB already connected');
      return;
    }

    const isProduction = process.env.NODE_ENV === 'production';
    let uri: string;
    let shouldAutoSeed = false;

    if (isProduction && process.env.MONGODB_URI) {
      uri = process.env.MONGODB_URI;
    } else {
      if (!mongoServer) {
        console.log('🚀 Starting MongoDB Memory Server...');
        mongoServer = await MongoMemoryServer.create();
        console.log(`📦 MongoDB Memory Server URI: ${mongoServer.getUri()}`);
      }
      uri = mongoServer.getUri();
      shouldAutoSeed = true;
    }

    await mongoose.connect(uri);
    console.log('✅ MongoDB connected successfully');

    if (shouldAutoSeed && !isSeeded) {
      await autoSeed();
      isSeeded = true;
    }
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}

async function autoSeed() {
  try {
    const Course = (await import('./models/Course')).default;
    const courseCount = await Course.countDocuments();
    
    if (courseCount === 0) {
      console.log('🌱 Database is empty, running seed script...');
      const { seed } = await import('./scripts/seed');
      await seed();
      console.log('✅ Seed completed successfully');
    } else {
      console.log('📚 Database already has data, skipping seed');
    }
  } catch (error) {
    console.error('❌ Auto-seed error:', error);
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
