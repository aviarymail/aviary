import { authService } from '@aviarymail/services';
import {
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
} from '../lib/errors';
import { builder } from '../schema-builder';

builder.mutationField('verifyLoginCode', t =>
  t.prismaField({
    type: 'User',
    skipTypeScopes: true,
    args: {
      email: t.arg.string(),
      code: t.arg.string(),
    },
    async resolve(query, _root, { email, code }, { request, reply }) {
      const { data, error } = await authService.validateLogin({
        query,
        email,
        code,
        userAgent: request.headers['user-agent'],
      });

      if (error === 'auth/INVALID_CODE') {
        throw new BadRequestException('Invalid login code.');
      }

      if (error === 'user/NOT_FOUND') {
        throw new ForbiddenException();
      }

      if (!data) {
        throw new InternalServerErrorException();
      }

      if (data.cookies) {
        for (const cookie of data.cookies) {
          reply.setCookie(cookie.name, cookie.token, cookie.cookieConfig);
        }
      }

      return data.user;
    },
  })
);
