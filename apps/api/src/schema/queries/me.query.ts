import { prisma } from '../../lib/prisma';
import { UserType } from '../object-types/user.type';
import { builder } from '../schema-builder';

builder.queryField('me', t =>
  t.field({
    type: UserType,
    nullable: true,

    authScopes: { public: true },

    async resolve(_root, _args, { currentUserId }) {
      if (!currentUserId) {
        return null;
      }

      return prisma.user.findUnique({
        where: { id: currentUserId },
      });
    },
  }),
);
