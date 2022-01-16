import { db } from '@aviarymail/db';
import { Utils } from '@aviarymail/services';
import fastify from 'fastify';
import cookie from 'fastify-cookie';
import cors from 'fastify-cors';
import mercurius from 'mercurius';
import { Config } from './lib/config';
import { emitter } from './lib/pubsub';

import { schema } from './schema';
import { context } from './schema/context';
import { errorFormatter } from './schema/lib/error-formatter';

export function createServer() {
  const server = fastify({
    logger: true,
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
    await Utils.redis.quit();
  });

  return server;
}
