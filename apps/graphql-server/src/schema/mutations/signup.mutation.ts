import { builder } from '../schema-builder';
import { z } from 'zod';
import { BadRequestException, InternalServerErrorException } from '../lib/errors';
import { authService } from '@aviarymail/services';

const input = builder.inputType('SignupInput', {
  fields: t => ({
    email: t.string(),
    firstName: t.string(),
    lastName: t.string(),
  }),
});

const schema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1, 'First name is required.'),
  lastName: z.string().min(1, 'First name is required.'),
});

builder.mutationField('signup', t =>
  t.prismaField({
    type: 'User',
    authScopes: {
      public: true,
    },
    args: {
      input: t.arg({
        type: input,
        validate: { schema },
      }),
    },
    async resolve(query, _root, { input }, _ctx) {
      const { user, error } = await authService.registerUser({
        ...input,
        query,
      });

      if (error === 'user/EMAIL_TAKEN') {
        throw new BadRequestException('An account exists with that email.');
      }

      if (!user) {
        throw new InternalServerErrorException();
      }

      return user;
    },
  })
);
