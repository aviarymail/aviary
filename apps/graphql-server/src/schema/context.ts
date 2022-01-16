import { db, Prisma, Session } from '@aviarymail/db';
import { generateToken, generateTokenPair } from '@aviarymail/services/src/utils/crypto';
import { FastifyReply, FastifyRequest } from 'fastify';
import { SocketStream } from 'fastify-websocket';

import { Config } from '../lib/config';
import { ISchemaBuilder } from './schema-builder.interface';

type ResolverContext = Omit<ISchemaBuilder['Context'], 'pubsub'>;
type SubContext = Omit<ISchemaBuilder['SubscriptionContext'], 'pubsub'>;

/**
 * If we're given a token, check for
 */
async function _findSession(request: FastifyRequest) {
  const token = request.cookies[Config.COOKIE_TOKEN];
  const refreshToken = request.cookies[Config.COOKIE_REFRESH];
  let session: Session | null = null;

  // If we don't have either token, we have no session.
  if (token) {
    session = await db.session.findUnique({
      where: { token },
    });
  }

  if (!session && refreshToken) {
    session = await db.session.findUnique({
      where: { refreshToken },
    });
  }

  return session;
}

export async function context(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<ResolverContext> {
  const session = await _findSession(request);

  if (session && session.maxAge > Date.now()) {
    const [token, refreshToken] = await generateTokenPair();
    const maxAge = Date.now() + Config.COOKIE_REFRESH_EXP;

    await db.session.update({
      where: { id: session.id },
      data: { token, refreshToken, maxAge },
    });

    reply.setCookie(Config.COOKIE_TOKEN, session.token, {
      httpOnly: Config.IS_PROD,
      secure: Config.IS_PROD,
      maxAge: Config.COOKIE_TOKEN_EXP,
    });

    reply.setCookie(Config.COOKIE_REFRESH, refreshToken, {
      httpOnly: Config.IS_PROD,
      secure: Config.IS_PROD,
      maxAge: Config.COOKIE_REFRESH_EXP,
    });
  }

  return {
    request,
    reply,
    currentUserId: session?.userId,
  };
}

export async function subscriptionContext(
  connection: SocketStream,
  request: FastifyRequest
): Promise<SubContext> {
  const session = await _findSession(request);

  return {
    connection,
    request,
    currentUserId: session?.userId,
  };
}
