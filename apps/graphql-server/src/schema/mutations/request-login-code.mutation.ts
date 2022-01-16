import { authService } from '@aviarymail/services';
import { z } from 'zod';

import { BadRequestException } from '../lib/errors';
import { builder } from '../schema-builder';

builder.mutationField('requestLoginCode', t =>
  t.field({
    type: 'SuccessResponse',
    skipTypeScopes: true,
    args: {
      email: t.arg.string({
        validate: {
          schema: z.string().email('Invalid email address.'),
        },
      }),
    },
    async resolve(_root, { email }) {
      const { error } = await authService.requestLoginCode(email);

      if (error === 'user/NOT_FOUND') {
        throw new BadRequestException();
      }

      return { success: true };
    },
  })
);
