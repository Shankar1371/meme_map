import { FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';
import { config } from './env';

export interface UserToken {
  id: string;
  handle: string;
  email?: string;
}

export async function verifyRequest(request: FastifyRequest): Promise<UserToken | null> {
  const header = request.headers.authorization;
  if (!header) return null;
  const token = header.replace('Bearer ', '');
  try {
    return jwt.verify(token, config.JWT_DEV_SECRET) as UserToken;
  } catch {
    return null;
  }
}

export function devLogin(user: UserToken): string {
  return jwt.sign(user, config.JWT_DEV_SECRET);
}
