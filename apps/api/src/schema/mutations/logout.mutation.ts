import { Config } from '../../lib/config';
import { prisma } from '../../lib/prisma';
import { UserType } from '../object-types/user.type';
import { builder } from '../schema-builder';

builder.mutationField('logout', t =>
  t.field({
    type: UserType,
    async resolve(_root, _args, { reply, currentUserId }) {
      const user = await prisma.user.findUnique({
        where: { id: currentUserId },
        rejectOnNotFound: true,
      });

      reply.setCookie(Config.COOKIE, '', {
        httpOnly: true,
        expires: new Date(-1),
      });

      return user;
    },
  }),
);
