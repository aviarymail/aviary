import { db } from '@aviarymail/db';
import { authService } from '@aviarymail/services';
import { generateTokenPair } from '@aviarymail/services/src/utils/crypto';
import { Config } from '../../lib/config';
import { BadRequestException, ForbiddenException } from '../lib/errors';
import { builder } from '../schema-builder';

builder.mutationField('login', t =>
  t.prismaField({
    type: 'User',
    skipTypeScopes: true,
    args: {
      email: t.arg.string(),
      code: t.arg.string(),
    },
    async resolve(query, _root, { email, code }, { request, reply }) {
      const { error } = await authService.validateLogin(email, code);

      if (error === 'auth/INVALID_CODE') {
        throw new BadRequestException('Invalid login code.');
      }

      const user = await db.user.findUnique({
        ...query,
        where: { email },
      });

      if (!user) {
        throw new ForbiddenException();
      }

      const [token, refreshToken] = await generateTokenPair();
      const maxAge = Date.now() + Config.COOKIE_REFRESH_EXP;
      const userAgent = request.headers['user-agent'];

      await db.session.create({
        data: {
          token,
          refreshToken,
          maxAge,
          userAgent,
          user: { connect: { email: user.email } },
        },
      });

      reply.setCookie(Config.COOKIE_TOKEN, token, {
        httpOnly: Config.IS_PROD,
        secure: Config.IS_PROD,
        maxAge: Config.COOKIE_TOKEN_EXP,
      });

      reply.setCookie(Config.COOKIE_REFRESH, refreshToken, {
        httpOnly: Config.IS_PROD,
        secure: Config.IS_PROD,
        maxAge: Config.COOKIE_REFRESH_EXP,
      });

      return user;
    },
  })
);
