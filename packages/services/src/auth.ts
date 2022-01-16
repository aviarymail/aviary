import { db } from '@aviarymail/db';
import { generateRedisToken } from './utils/crypto';
import { redis } from './utils/redis';

export async function registerUser(params: { email: string; firstName: string; lastName: string }) {
  const user = await db.user.findUnique({
    where: { email: params.email },
  });

  if (user) {
    return { error: 'USER_EXISTS' } as const;
  }

  const data = await db.user.create({ data: params });
  return { data };
}

export async function sendLoginEmail(email: string) {
  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user) {
    return { error: 'NULL_USER' } as const;
  }

  await generateRedisToken(user.email);

  return {
    data: { success: true },
  };
}

export async function validateLogin(email: string, token: string) {
  const value = await redis.get(token);

  if (value !== email) {
  }
}
