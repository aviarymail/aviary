import { db } from '@aviarymail/db';
import { Config } from '../../lib/config';
import { ForbiddenException } from '../lib/errors';
import { builder } from '../schema-builder';

const expires = new Date().getTime() + 1000 * 60 * 60 * 60 * 24 * 1.5; // 1.5 days

builder.mutationField('login', t =>
  t.prismaField({
    type: 'User',
    skipTypeScopes: true,
    args: {
      email: t.arg.string(),
    },
    async resolve(query, _root, { email }, { reply }) {
      const user = await db.user.findUnique({
        ...query,
        where: { email },
      });

      if (!user) {
        throw new ForbiddenException();
      }

      reply.setCookie(Config.COOKIE, 'token', {
        httpOnly: true,
        expires: new Date(expires),
      });

      return { ...user };
    },
  })
);
