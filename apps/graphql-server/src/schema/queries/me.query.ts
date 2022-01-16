import { db } from '@aviarymail/db';
import { $User } from '../object-types/user.type';
import { builder } from '../schema-builder';

builder.queryField('me', t =>
  t.prismaField({
    type: 'User',
    nullable: true,
    skipTypeScopes: true,
    async resolve(query, _root, _args, { currentUserId }) {
      if (!currentUserId) {
        return null;
      }

      return db.user.findUnique({
        ...query,
        where: { id: currentUserId },
      });
    },
  })
);
