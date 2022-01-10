import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  // log: ['query'],
});

export const prismaUtils = new (class PrismaUtils {
  parsePagination(
    pagination?: {
      cursor?: string | null;
      take?: number | null;
      skip?: number | null;
    } | null
  ) {
    return {
      cursor: pagination?.cursor ? { id: pagination.cursor } : undefined,
      take: pagination?.take ?? 20,
      skip: !pagination?.skip ? (pagination?.cursor ? 1 : 0) : pagination.skip,
    };
  }
})();
