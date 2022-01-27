export * from '@prisma/client';
export type { default as PothosPrismaTypes } from '@pothos/plugin-prisma/generated';

import { PrismaClient } from '@prisma/client';

export const db = new PrismaClient();
