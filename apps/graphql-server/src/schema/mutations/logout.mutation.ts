import { ServerConfig } from '@aviarymail/config';
import { authService } from '@aviarymail/services';
import { builder } from '../schema-builder';

const COOKIE_CONFIG = {
  httpOnly: true,
  maxAge: 0,
};

builder.mutationField('logout', t =>
  t.field({
    type: 'SuccessResponse',
    async resolve(_root, _args, { reply, sessionId }) {
      await authService.deleteSession(sessionId);

      reply.setCookie(ServerConfig.COOKIE_TOKEN, '', COOKIE_CONFIG);
      reply.setCookie(ServerConfig.COOKIE_REFRESH, '', COOKIE_CONFIG);

      return { success: true };
    },
  })
);
