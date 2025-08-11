import { Pool } from 'pg';
import { config } from './env';

export const pool = new Pool({ connectionString: config.DATABASE_URL });

export async function query<T>(text: string, params?: any[]): Promise<T[]> {
  const res = await pool.query<T>(text, params);
  return res.rows;
}
