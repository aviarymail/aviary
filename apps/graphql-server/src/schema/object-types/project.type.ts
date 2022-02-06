import { builder } from '../schema-builder';

builder.prismaObject('Project', {
  findUnique({ id }) {
    return { id };
  },
  fields(t) {
    return {
      id: t.exposeID('id'),
      createdAt: t.expose('createdAt', { type: 'DateTime' }),
      updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
      name: t.exposeString('name'),

      teamId: t.exposeID('teamId'),
      team: t.relation('team'),
    };
  },
});
