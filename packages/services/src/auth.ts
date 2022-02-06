import { ServerEnv } from '@aviarymail/config/server-env';
import { db, Prisma, TeamRoles } from '@aviarymail/db';
import { logger } from '.';
import { generateToken } from './utils/crypto';
import { redis } from './utils/redis';

const COOKIE_CONFIG = {
  httpOnly: ServerEnv.PROD,
  secure: ServerEnv.PROD,
};

/**
 *
 * Create a new user and, if necessary, send them a confirmation email.
 *
 * @param params
 */
export async function registerUser(params: {
  email: string;
  firstName: string;
  lastName: string;
  skipConfirmation?: boolean;
}) {
  let user = await db.user.findUnique({
    where: { email: params.email },
  });

  if (user) {
    return { error: 'user/EMAIL_TAKEN' } as const;
  }

  user = await db.user.create({
    data: {
      email: params.email,
      firstName: params.firstName,
      lastName: params.lastName,
      confirmedAt: params.skipConfirmation ? new Date() : undefined,
      teamMemberships: {
        create: {
          role: TeamRoles.Admin,
          team: {
            create: {
              name: 'Personal',
            },
          },
        },
      },
    },
  });

  // TODO: Send email confirmation

  return { data: user };
}

/**
 *
 * Generates a login code and sends the user an email for them to login with.
 *
 * @param email
 */
export async function requestLoginCode(email: string) {
  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user) {
    return { error: 'user/NOT_FOUND' } as const;
  }

  const code = await _generateLoginCode(user.id);

  console.log(ServerEnv.DEV);

  if (ServerEnv.DEV) {
    console.log(
      '\n' +
        `Sending login request code to ${email} \n\n` +
        'Click to login: \n' +
        `http://localhost:8080/login/verify?email=${email}&code=${code}` +
        '\n'
    );
  }

  // TODO: Send login code email

  return { data: user };
}

/**
 *
 * Validate a user's login. Take their email as well as the code we sent to them
 * in the request login message to confirm their identity and create a session.
 *
 * @param params
 */
export async function validateLogin(params: {
  email: string;
  code: string;
  userAgent?: string;
  query?: Partial<Prisma.UserFindUniqueArgs>;
}) {
  const user = await db.user.findUnique({
    ...params.query,
    where: { email: params.email },
  });

  if (!user) {
    return { error: 'user/NOT_FOUND' } as const;
  }

  const valid = await _validateLoginCode(user.id, params.code);

  if (!valid) {
    return { error: 'auth/INVALID_CODE' } as const;
  }

  const { cookies } = await createSession({
    email: params.email,
    userAgent: params.userAgent,
  });

  return { data: { user, cookies } } as const;
}

/**
 *
 * Create a session with a token and refresh token.
 * Build cookie configurations to be set by the reply.
 *
 * @param params
 */
export async function createSession(params: { email: string; userAgent?: string }) {
  const [sessionToken, refreshToken] = await Promise.all([generateToken(), generateToken()]);

  await db.session.create({
    data: {
      token: sessionToken,
      refreshToken,
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
 *
 * Take a given session and refresh it with new tokens.
 * Build cookie configurations to be set by the reply.
 *
 * @param sessionId
 */
export async function refreshSession(sessionId: string) {
  const [sessionToken, refreshToken] = await Promise.all([generateToken(), generateToken()]);

  await db.session.update({
    where: { id: sessionId },
    data: {
      token: sessionToken,
      refreshToken: refreshToken,
    },
  });

  return {
    sessionToken,
    refreshToken,
    cookies: _getCookieConfigs(sessionToken, refreshToken),
  };
}

/**
 *
 * Delete a session.
 *
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
 *
 * Create a tuple of cookie configurations [sessionCookie, refreshCookie].
 *
 * @param sessionToken
 * @param refreshToken
 */
function _getCookieConfigs(sessionToken: string, refreshToken: string) {
  return [
    {
      name: ServerEnv.COOKIE_TOKEN,
      token: sessionToken,
      cookieConfig: {
        ...COOKIE_CONFIG,
        maxAge: ServerEnv.COOKIE_TOKEN_TTL,
      },
    },
    {
      name: ServerEnv.COOKIE_REFRESH,
      token: refreshToken,
      cookieConfig: {
        ...COOKIE_CONFIG,
        maxAge: ServerEnv.COOKIE_REFRESH_TTL,
      },
    },
  ] as const;
}

/**
 *
 * Generates a six digit login code and saves it to redis.
 *
 * @param userId
 */
async function _generateLoginCode(userId: string) {
  let code = '';

  for (let index = 0; index < 6; index++) {
    code += String(Math.floor(Math.random() * 10));
  }

  const res = await redis.set(userId, code, 'ex', 60 * 5);

  if (res !== 'OK') {
    logger.error('Auth._generateLoginCode: Failed to save code to redis db.');
    throw new Error();
  }

  return code;
}

/**
 *
 * Validates a given combo of userId and code to determine a users identity.
 *
 * @param userId
 * @param code
 */
async function _validateLoginCode(userId: string, code: string) {
  const value = await redis.get(userId);
  const valid = value && value === code;

  if (valid) {
    await redis.del(userId);
    return true;
  }

  return false;
}
