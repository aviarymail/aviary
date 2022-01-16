import { db, Prisma } from '@aviarymail/db';
import { ServerConfig } from '@aviarymail/config';
import { generateRedisToken, generateToken } from './utils/crypto';
import { redis } from './utils/redis';

const COOKIE_CONFIG = {
  httpOnly: ServerConfig.IS_PROD,
  secure: ServerConfig.IS_PROD,
};

/**
 * Create a new user and, if necessary, send them a confirmation email.
 * @param params
 */
export async function registerUser(params: {
  email: string;
  firstName: string;
  lastName: string;
  skipConfirmation?: boolean;
  query?: Partial<Prisma.UserCreateArgs>;
}) {
  let user = await db.user.findUnique({
    where: { email: params.email },
  });

  if (user) {
    return { data: null, error: 'user/EMAIL_TAKEN' } as const;
  }

  user = await db.user.create({
    ...params.query,
    data: {
      email: params.email,
      firstName: params.firstName,
      lastName: params.lastName,
      confirmedAt: params.skipConfirmation ? new Date() : undefined,
    },
  });

  // TODO: Send email confirmation

  return { user };
}

export async function requestLoginCode(email: string) {
  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user) {
    return { error: 'user/NOT_FOUND' } as const;
  }

  // TODO: Send login code email

  return { user };
}

/**
 * Validate a user's login. Take their email as well as the code we sent to them
 * in the request login message to confirm their identity and create a session.
 * @param params
 */
export async function validateLogin(params: {
  email: string;
  code: string;
  userAgent?: string;
  query?: Partial<Prisma.UserFindUniqueArgs>;
}) {
  const value = await redis.get(params.code);

  if (!value || value !== params.email) {
    return { error: 'auth/INVALID_CODE' } as const;
  }

  const user = await db.user.findUnique({
    ...params.query,
    where: { email: params.email },
  });

  if (!user) {
    return { error: 'user/NOT_FOUND' } as const;
  }

  const { cookies } = await createSession({
    email: params.email,
    userAgent: params.userAgent,
  });

  return { user, cookies };
}

/**
 * Create a session with a token and refresh token.
 * Build cookie configurations to be set by the reply.
 * @param params
 */
export async function createSession(params: { email: string; userAgent?: string }) {
  const [sessionToken, refreshToken] = await Promise.all([generateToken(), generateToken()]);
  const maxAge = Date.now() + ServerConfig.COOKIE_REFRESH_TTL;

  await db.session.create({
    data: {
      token: sessionToken,
      refreshToken,
      maxAge,
      userAgent: params.userAgent,
      user: {
        connect: { email: params.email },
      },
    },
  });

  return {
    sessionToken,
    refreshToken,
    cookies: _getCookieConfigs(sessionToken, refreshToken),
  };
}

/**
 * Take a given session and refresh it with new tokens.
 * Build cookie configurations to be set by the reply.
 * @param sessionId
 */
export async function refreshSession(sessionId: string) {
  const [sessionToken, refreshToken] = await Promise.all([generateToken(), generateToken()]);

  await db.session.update({
    where: { id: sessionId },
    data: {
      token: sessionToken,
      refreshToken: refreshToken,
      maxAge: Date.now() + ServerConfig.COOKIE_REFRESH_TTL,
    },
  });

  return {
    sessionToken,
    refreshToken,
    cookies: _getCookieConfigs(sessionToken, refreshToken),
  };
}

/**
 * Delete a session.
 * @param sessionId
 */
export async function deleteSession(sessionId?: string) {
  if (sessionId) {
    return db.session.delete({
      where: { id: sessionId },
    });
  }
}

/**
 * Create a tuple of cookie configurations [sessionCookie, refreshCookie].
 * @param sessionToken
 * @param refreshToken
 */
function _getCookieConfigs(sessionToken: string, refreshToken: string) {
  return [
    {
      name: ServerConfig.COOKIE_TOKEN,
      token: sessionToken,
      cookieConfig: {
        ...COOKIE_CONFIG,
        maxAge: ServerConfig.COOKIE_TOKEN_TTL,
      },
    },
    {
      name: ServerConfig.COOKIE_REFRESH,
      token: refreshToken,
      cookieConfig: {
        ...COOKIE_CONFIG,
        maxAge: ServerConfig.COOKIE_REFRESH_TTL,
      },
    },
  ] as const;
}
