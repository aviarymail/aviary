import { builder } from '../schema-builder';

builder.prismaObject('Team', {
  findUnique: ({ id }) => {
    return { id };
  },
  fields(t) {
    return {
      id: t.exposeID('id'),
      createdAt: t.expose('createdAt', { type: 'DateTime' }),
      updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
      name: t.exposeString('name'),

      memberships: t.relation('memberships'),
      projects: t.relation('projects'),
      invites: t.relation('invites'),
    };
  },
});
