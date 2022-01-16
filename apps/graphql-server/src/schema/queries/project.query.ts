import { db } from '@aviarymail/db';
import { ForbiddenException, NotFoundException } from '../lib/errors';
import { builder } from '../schema-builder';

builder.queryField('project', t =>
  t.prismaField({
    type: 'Project',
    nullable: true,
    args: {
      id: t.arg.id(),
    },
    async resolve(query, _root, { id }, { currentUserId }) {
      const project = await db.project.findUnique({
        ...query,
        where: { id },
      });

      if (!project) {
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

      return project;
    },
  })
);
