import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export const NotFoundException = createErrorClass('NOT_FOUND');
export const BadRequestException = createErrorClass('BAD_REQUEST');
export const ForbiddenException = createErrorClass('FORBIDDEN');
export const UnauthorizedException = createErrorClass('UNAUTHORIZED');
export const InternalServerErrorException = createErrorClass('INTERNAL_SERVER_ERROR');

function createErrorClass(key: keyof typeof StatusCodes) {
  return class extends Error {
    extensions: object;

    constructor(...args: any[]) {
      const message = typeof args[0] === 'string' ? args[0] : ReasonPhrases[key];
      const extensions = typeof args[0] === 'object' ? args[0] : {};

      super(message);
      this.extensions = { statusCode: StatusCodes[key], ...extensions };
    }
  };
}
