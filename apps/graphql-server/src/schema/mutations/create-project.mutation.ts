import { db } from '@aviarymail/db';
import { BadRequestException } from '../lib/errors';
import { builder } from '../schema-builder';

builder.mutationField('createProject', t =>
  t.prismaField({
    type: 'Project',
    args: {
      input: t.arg({
        type: builder.inputType('CreateProjectInput', {
          fields: t => ({
            teamId: t.id(),
            name: t.string(),
          }),
        }),
      }),
    },
    async resolve(query, _root, { input }, { currentUserId }) {
      const teamMembership = await db.teamMembership.findUnique({
        where: {
          userId_teamId: {
            userId: currentUserId!,
            teamId: input.teamId,
          },
        },
      });

      if (!teamMembership) {
        throw new BadRequestException();
      }

      return db.project.create({
        ...query,
        data: {
          name: input.name,
          team: {
            connect: { id: input.teamId },
          },
        },
      });
    },
  })
);
