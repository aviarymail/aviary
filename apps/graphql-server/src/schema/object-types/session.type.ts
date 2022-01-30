import { builder } from '../schema-builder';

builder.prismaObject('Session', {
  findUnique({ id }) {
    return { id };
  },
  fields(t) {
    return {
      id: t.exposeID('id'),
      createdAt: t.expose('createdAt', { type: 'DateTime' }),
      token: t.exposeString('token'),
      userAgent: t.exposeString('userAgent', { nullable: true }),
    };
  },
});
