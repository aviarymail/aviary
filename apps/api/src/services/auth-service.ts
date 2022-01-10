import { nanoid } from 'nanoid';
import { createSigner, createVerifier } from 'fast-jwt';
import argon2 from 'argon2';
import { User } from '@prisma/client';

import { prisma } from '../lib/prisma';
import { Config } from '../lib/config';

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

  async authenticateUser(email: string, password: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      return null;
    }

    const valid = await argon2.verify(user.passwordHash, password);
    return valid ? user : null;
  }

  async signUp(params: {
    email: string;
    password: string;
    confirmation: string;
    firstName: string;
    lastName: string;
    username: string;
  }) {
    const token = nanoid();
    const user = await prisma.user.create({
      data: {
        email: params.email,
        passwordHash: await argon2.hash(params.password),
      },
    });

    return { user, token };
  }
}

export const authService = new AuthService();
