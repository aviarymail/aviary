import { Config } from '../../lib/config';
import { authService } from '../../services/auth-service';
import { ForbiddenException } from '../lib/errors';
import { UserType } from '../object-types/user.type';
import { builder } from '../schema-builder';

builder.mutationField('login', t =>
  t.field({
    type: UserType,
    skipTypeScopes: true,
    args: {
      email: t.arg.string(),
      password: t.arg.string(),
    },
    async resolve(_root, { email, password }, { reply }) {
      const user = await authService.authenticateUser(email, password);

      if (!user) {
        throw new ForbiddenException();
      }

      const token = await authService.signJwt(user.id);

      reply.setCookie(Config.COOKIE, token, {
        httpOnly: true,
        expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 60 * 24 * 30), // 30 days
      });

      return { ...user, token };
    },
  }),
);
