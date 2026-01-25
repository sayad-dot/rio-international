import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const connectionString = process.env.DATABASE_URL;

// Configure connection pool with better settings for free tier
const pool = new pg.Pool({ 
  connectionString,
  max: 10, // Maximum connections in pool
  idleTimeoutMillis: 30000, // Close idle connections after 30s
  connectionTimeoutMillis: 10000, // Wait 10s for connection
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

// Test connection with retry logic
const connectWithRetry = async (retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      await prisma.$connect();
      console.log('✅ Database connected successfully');
      return;
    } catch (error) {
      console.error(`❌ Database connection attempt ${i + 1}/${retries} failed:`, error.message);
      if (i === retries - 1) {
        console.error('Failed to connect after all retries');
        process.exit(1);
      }
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, 2000 * (i + 1)));
    }
  }
};

connectWithRetry();

export default prisma;
