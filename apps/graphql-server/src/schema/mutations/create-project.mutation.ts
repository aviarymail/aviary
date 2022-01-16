import { teamsService } from '@aviarymail/services';
import { z } from 'zod';
import { ForbiddenException, InternalServerErrorException } from '../lib/errors';
import { builder } from '../schema-builder';

const input = builder.inputType('CreateProjectInput', {
  fields: t => ({
    teamId: t.id(),
    name: t.string(),
  }),
});

const schema = z.object({
  teamId: z.string().min(1, '`teamId` is required.'),
  name: z.string().min(1, '`name` is required.'),
});

builder.mutationField('createProject', t =>
  t.prismaField({
    type: 'Project',
    args: {
      input: t.arg({
        type: input,
        validate: { schema },
      }),
    },
    async resolve(query, _root, { input }, { currentUserId }) {
      const { project, error } = await teamsService.createProject({
        ...input,
        userId: currentUserId!,
        query,
      });

      if (error === 'teamMembership/NOT_FOUND') {
        throw new ForbiddenException();
      }

      if (!project) {
        throw new InternalServerErrorException();
      }

      return project;
    },
  })
);
