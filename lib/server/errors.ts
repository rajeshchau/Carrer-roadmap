import { Prisma } from '@prisma/client';

export type ApiMappedError = {
  status: number;
  error: string;
  issue?: string;
};

export function toApiError(error: unknown): ApiMappedError {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      return { status: 409, error: 'Duplicate value violates a unique constraint.', issue: 'UNIQUE_CONSTRAINT' };
    }
    if (error.code === 'P2025') {
      return { status: 404, error: 'Requested record was not found.', issue: 'RECORD_NOT_FOUND' };
    }

    return {
      status: 500,
      error: `Database request failed (${error.code}).`,
      issue: 'PRISMA_KNOWN_ERROR',
    };
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    return {
      status: 500,
      error: 'Database initialization failed. Check DATABASE_URL and DB availability.',
      issue: 'PRISMA_INIT_ERROR',
    };
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return {
      status: 400,
      error: 'Invalid data sent to the database operation.',
      issue: 'PRISMA_VALIDATION_ERROR',
    };
  }

  if (error instanceof Error) {
    if (error.message.includes('DATABASE_URL is not set')) {
      return {
        status: 500,
        error: 'Server configuration error: DATABASE_URL is missing.',
        issue: 'MISSING_DATABASE_URL',
      };
    }

    if (error.message.includes('JWT_SECRET')) {
      return {
        status: 500,
        error: 'Server configuration error: JWT_SECRET is missing.',
        issue: 'MISSING_JWT_SECRET',
      };
    }

    return {
      status: 500,
      error: error.message || 'Internal server error',
      issue: 'UNHANDLED_ERROR',
    };
  }

  return {
    status: 500,
    error: 'Internal server error',
    issue: 'UNKNOWN_ERROR',
  };
}
