import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

let cachedJwtSecret: string | null = null;

function getJwtSecret(): string {
  if (cachedJwtSecret) {
    return cachedJwtSecret;
  }
  
  const rawJwtSecret = process.env.JWT_SECRET;
  
  if (process.env.NODE_ENV === 'production' && !rawJwtSecret) {
    throw new Error('JWT_SECRET environment variable must be set in production');
  }
  
  cachedJwtSecret = rawJwtSecret || 'dev-secret-change-me';
  return cachedJwtSecret;
}

export type AuthPayload = { userId: string; role: 'USER' | 'ADMIN' };

export function signAuthToken(payload: AuthPayload) {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: '7d' });
}

export function readAuthToken(request: NextRequest): AuthPayload | null {
  const auth = request.headers.get('authorization');
  if (!auth?.startsWith('Bearer ')) return null;
  const token = auth.slice(7);
  try {
    return jwt.verify(token, getJwtSecret()) as AuthPayload;
  } catch {
    return null;
  }
}
