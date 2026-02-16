export function toApiError(error: unknown) {
  if (error instanceof Error) {
    if (error.message.includes('DATABASE_URL is not set')) {
      return {
        status: 500,
        error: 'Server configuration error: DATABASE_URL is missing.',
      };
    }

    if (error.message.includes('JWT_SECRET')) {
      return {
        status: 500,
        error: 'Server configuration error: JWT_SECRET is missing.',
      };
    }
  }

  return {
    status: 500,
    error: 'Internal server error',
  };
}
