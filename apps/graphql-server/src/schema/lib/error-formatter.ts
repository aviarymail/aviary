import { GraphQLError, formatError } from 'graphql';
import { StatusCodes } from 'http-status-codes';

export function errorFormatter(err: any, ctx: any) {
  let errors = [{ message: err.message }];

  if (err.errors) {
    errors = err.errors.map((error: any) => {
      let err: Record<string, any> = error;

      if (error instanceof GraphQLError) {
        const formatted = formatError(error);

        if (formatted.message.indexOf('Not authorized') !== -1) {
          const statusCode = StatusCodes.UNAUTHORIZED;
          const extensions = formatted.extensions
            ? { ...formatted.extensions, statusCode }
            : { statusCode };

          err = { ...formatted, message: 'Unauthorized', extensions };
        }
      }

      return err;
    });
  }

  return {
    statusCode: StatusCodes.OK,
    response: {
      data: err.data || null,
      errors,
    },
  };
}
