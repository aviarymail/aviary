import { db } from '@aviarymail/db';
import { ForbiddenException, NotFoundException } from '../lib/errors';
import { builder } from '../schema-builder';

builder.queryField('team', t =>
  t.prismaField({
    type: 'Team',
    nullable: true,
    args: {
      id: t.arg.id(),
    },
    async resolve(query, _root, { id }, { currentUserId }) {
      const team = await db.team.findUnique({
        ...query,
        where: { id },
      });

      if (!team) {
        throw new NotFoundException();
      }

      const teamMembership = await db.teamMembership.findUnique({
        where: {
          userId_teamId: {
            userId: currentUserId!,
            teamId: id,
          },
        },
      });

      if (!teamMembership) {
        throw new ForbiddenException();
      }

      return team;
    },
  })
);
