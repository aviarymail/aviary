export * from '@prisma/client';
export type { default as GiraphqlPrismaTypes } from '@giraphql/plugin-prisma/generated';

import { PrismaClient } from '@prisma/client';

export const db = new PrismaClient();
