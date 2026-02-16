import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: PrismaClient | undefined;
}

export function getPrisma() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set. Configure it in your environment before using API routes.');
  }

  if (!globalThis.prismaGlobal) {
    globalThis.prismaGlobal = new PrismaClient();
  }

  return globalThis.prismaGlobal;
}
