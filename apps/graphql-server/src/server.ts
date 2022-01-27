import { db } from '@aviarymail/db';
import { redis, logger } from '@aviarymail/services';
import fastify, { FastifyInstance } from 'fastify';
import cookie from 'fastify-cookie';
import cors from 'fastify-cors';
import mercurius from 'mercurius';
import { Config } from './lib/config';
import { emitter } from './lib/pubsub';

import { schema } from './schema';
import { context } from './schema/context';
import { errorFormatter } from './schema/lib/error-formatter';

export function createServer(): FastifyInstance {
  const server = fastify({
    logger,
  });

  server.register(cors, {
    origin: Config.WEB_URL,
    credentials: true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  });

  server.register(cookie);

  server.register(mercurius, {
    schema,
    context,
    allowBatchedQueries: true,
    subscription: { emitter },
    errorFormatter: errorFormatter as any,
  });

  server.addHook('onError', (req, res, error) => {
    console.error(error);
  });

  server.addHook('onClose', async () => {
    await db.$disconnect();
    await redis.quit();
  });

  return server;
}
