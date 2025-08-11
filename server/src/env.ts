import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.server' });

export const config = {
  PORT: Number(process.env.PORT) || 4000,
  DATABASE_URL: process.env.DATABASE_URL || '',
  STORAGE_DIR: process.env.STORAGE_DIR || './.local_storage',
  JWT_DEV_SECRET: process.env.JWT_DEV_SECRET || 'dev-secret',
};
