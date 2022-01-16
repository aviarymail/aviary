import { db, Session } from '@aviarymail/db';
import { ServerConfig } from '@aviarymail/config';
import { FastifyReply, FastifyRequest } from 'fastify';
import { SocketStream } from 'fastify-websocket';

import { ISchemaBuilder } from './schema-builder.interface';
import { authService } from '@aviarymail/services';

type ResolverContext = Omit<ISchemaBuilder['Context'], 'pubsub'>;
type SubContext = Omit<ISchemaBuilder['SubscriptionContext'], 'pubsub'>;

export async function context(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<ResolverContext> {
  const session = await _findSession(request);

  if (session && session.maxAge > Date.now()) {
    const { cookies } = await authService.refreshSession(session.id);

    if (cookies) {
      for (const cookie of cookies) {
        reply.setCookie(cookie.name, cookie.token, cookie.cookieConfig);
      }
    }
  }

  return {
    request,
    reply,
    currentUserId: session?.userId,
    sessionId: session?.id,
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
    sessionId: session?.id,
  };
}

/**
 * If we're given a token, check for
 */
async function _findSession(request: FastifyRequest) {
  const token = request.cookies[ServerConfig.COOKIE_TOKEN];
  const refreshToken = request.cookies[ServerConfig.COOKIE_REFRESH];
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
