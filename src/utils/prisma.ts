import { PrismaClient } from '@prisma/client';

export const db = new PrismaClient({ log: ['query', 'info'] });

export const connectDB = async () => {
  try {
    await db.$connect();
    console.log('🚀 Database connected successfully');
  } catch (error) {
    console.log(error);
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
};
