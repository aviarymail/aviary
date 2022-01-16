import { nanoid } from 'nanoid/async';
import { logger } from './logger';
import { redis } from './redis';

/**
 * Generate a secure token.
 */
export async function generateToken(): Promise<string> {
  return nanoid(48);
}

/**
 * Generates a secure token then use that token as the key while storing the given value.
 * @param value
 */
export async function generateRedisToken(value: string): Promise<string> {
  const token = await generateToken();
  const res = await redis.set(token, value);

  if (!res) {
    logger.error('Crypto.generateRedisToken: Failed to generate and save a token.');
    throw new Error();
  }

  return token;
}
