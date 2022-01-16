import { db, Prisma } from '@aviarymail/db';
import { generateRedisToken } from './utils/crypto';
import { redis } from './utils/redis';

export async function registerUser(
  params: { email: string; firstName: string; lastName: string },
  opts?: { include?: Prisma.UserInclude }
) {
  const user = await db.user.findUnique({
    where: { email: params.email },
  });

  if (user) {
    return { data: null, error: 'user/EMAIL_TAKEN' } as const;
  }

  const data = await db.user.create({
    ...opts,
    data: params,
  });

  return { data };
}

export async function sendLoginEmail(email: string) {
  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user) {
    return { error: 'user/NOT_FOUND' } as const;
  }

  await generateRedisToken(user.email);

  return {
    data: { success: true },
  };
}

export async function validateLogin(email: string, code: string) {
  const value = await redis.get(code);

  if (!value || value !== email) {
    return { error: 'auth/INVALID_CODE' } as const;
  }

  return { email };
}
