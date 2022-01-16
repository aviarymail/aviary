import { db } from '@aviarymail/db';
import { builder } from '../schema-builder';
import { object, string } from 'zod';
import { BadRequestException } from '../lib/errors';

const input = builder.inputType('SignupInput', {
  fields: t => ({
    email: t.string(),
    firstName: t.string(),
    lastName: t.string(),
  }),
});

const schema = object({
  email: string().email(),
  firstName: string().min(1, 'First name is required.'),
  lastName: string().min(1, 'First name is required.'),
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
      const user = await db.user.findUnique({
        where: { email: input.email },
      });

      if (user) {
        throw new BadRequestException('An account exists with that email.');
      }

      // TODO: send email confirmation email

      return db.user.create({ ...query, data: input });
    },
  })
);
