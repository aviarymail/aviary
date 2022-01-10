import { FastifyReply, FastifyRequest } from 'fastify';
import { SocketStream } from 'fastify-websocket';

import { Config } from '../lib/config';
import { authService } from '../services/auth-service';
import { ISchemaBuilder } from './schema-builder.interface';

type ResolverContext = Omit<ISchemaBuilder['Context'], 'pubsub'>;
type SubContext = Omit<ISchemaBuilder['SubscriptionContext'], 'pubsub'>;

export async function context(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<ResolverContext> {
  const cookie = request.cookies[Config.COOKIE];
  const header = request.headers.authorization?.replace('Bearer ', '');
  const claims = await authService.verifyJwt(cookie ?? header);

  return {
    request,
    reply,
    currentUserId: claims?.userId,
  };
}

export async function subscriptionContext(
  connection: SocketStream,
  request: FastifyRequest,
): Promise<SubContext> {
  const cookie = request.cookies[Config.COOKIE];
  const header = request.headers.authorization?.replace('Bearer ', '');
  const claims = await authService.verifyJwt(cookie ?? header);

  return {
    connection,
    request,
    currentUserId: claims?.userId,
  };
}
