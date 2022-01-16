import { db } from '@aviarymail/db';
import { Config } from '../../lib/config';
import { builder } from '../schema-builder';

builder.mutationField('logout', t =>
  t.prismaField({
    type: 'User',
    async resolve(query, _root, _args, { reply, currentUserId }) {
      const user = await db.user.findUnique({
        ...query,
        where: { id: currentUserId! },
        rejectOnNotFound: true,
      });

      reply.setCookie(Config.COOKIE, '', {
        httpOnly: true,
        expires: new Date(-1),
      });

      return user;
    },
  })
);
