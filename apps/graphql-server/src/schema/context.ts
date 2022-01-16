import { db } from '@aviarymail/db';
import { FastifyReply, FastifyRequest } from 'fastify';
import { SocketStream } from 'fastify-websocket';

import { Config } from '../lib/config';
import { ISchemaBuilder } from './schema-builder.interface';

type ResolverContext = Omit<ISchemaBuilder['Context'], 'pubsub'>;
type SubContext = Omit<ISchemaBuilder['SubscriptionContext'], 'pubsub'>;

function _findSession(request: FastifyRequest) {
  const cookie = request.cookies[Config.COOKIE];

  return db.session.findUnique({
    where: { token: cookie },
  });
}

export async function context(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<ResolverContext> {
  const session = await _findSession(request);

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
