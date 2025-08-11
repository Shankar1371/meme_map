import { promises as fs } from 'fs';
import path from 'path';
import { config } from './env';
import { randomUUID } from 'crypto';

const base = config.STORAGE_DIR;

export async function putObject(buffer: Buffer, ext: string): Promise<string> {
  await fs.mkdir(base, { recursive: true });
  const id = randomUUID();
  const file = path.join(base, `${id}.${ext}`);
  await fs.writeFile(file, buffer);
  return `/storage/${id}.${ext}`; // served statically in dev
}

export async function getSignedUrl(key: string): Promise<string> {
  // In dev we just return local path
  return `/storage/${key}`;
}
