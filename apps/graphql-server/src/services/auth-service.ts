import { createSigner, createVerifier } from 'fast-jwt';

import { Config } from '../lib/config';
import { db } from '@aviarymail/db';
import { Utils } from '@aviarymail/services';

interface JwtClaims {
  userId: string;
}

class AuthService {
  sign = createSigner({ key: Config.SECRET_KEY });
  verify = createVerifier({ key: Config.SECRET_KEY, cache: 5000 });

  async signJwt(userId: string): Promise<string> {
    return this.sign({ userId });
  }

  async verifyJwt(jwt?: string): Promise<JwtClaims | undefined> {
    return jwt ? this.verify(jwt) : undefined;
  }

  async signUp(params: {
    email: string;
    password: string;
    confirmation: string;
    firstName: string;
    lastName: string;
    username: string;
  }) {
    const token = await Utils.generateRedisToken(params.email);
    const user = await db.user.create({
      data: {
        email: params.email,
        firstName: params.firstName,
        lastName: params.lastName,
        emailConfirmation: {
          create: { token },
        },
      },
    });

    return { user, token };
  }
}

export const authService = new AuthService();
