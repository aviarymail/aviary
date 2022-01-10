import { prisma } from '../../lib/prisma';
import { NotFoundException } from '../lib/errors';
import { UserType } from '../object-types/user.type';
import { builder } from '../schema-builder';

builder.mutationField('confirmEmail', t =>
  t.field({
    type: UserType,
    args: {
      token: t.arg.string(),
    },
    async resolve(_root, { token }, _ctx) {
      const user = await prisma.user.findFirst({
        where: {
          emailConfirmation: { token },
        },
      });

      if (!user) {
        throw new NotFoundException();
      }

      return prisma.user.update({
        where: { id: user.id },
        data: {
          confirmedAt: new Date(),
          emailConfirmation: { delete: true },
        },
      });
    },
  }),
);
