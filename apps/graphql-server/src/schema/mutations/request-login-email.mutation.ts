import { db } from '@aviarymail/db';
import { authService } from '@aviarymail/services';
import { string } from 'zod';

import { ForbiddenException } from '../lib/errors';
import { builder } from '../schema-builder';

builder.mutationField('requestLoginEmail', t =>
  t.field({
    type: 'SuccessResponse',
    skipTypeScopes: true,
    args: {
      email: t.arg.string({
        validate: {
          schema: string().email('Invalid email address.'),
        },
      }),
    },
    async resolve(_root, { email }, { request, reply }) {
      const user = await db.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new ForbiddenException();
      }

      const { error } = await authService.sendLoginEmail(user.email);
      return { success: !error };
    },
  })
);
