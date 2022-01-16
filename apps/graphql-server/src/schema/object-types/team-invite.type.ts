import { builder } from '../schema-builder';

builder.prismaObject('TeamInvite', {
  findUnique: ({ id }) => {
    return { id };
  },
  fields(t) {
    return {
      id: t.exposeID('id'),
      createdAt: t.expose('createdAt', { type: 'DateTime' }),
      email: t.exposeString('email'),

      teamId: t.exposeID('teamId'),
      team: t.relation('team'),
      invitedById: t.exposeID('invitedById'),
      invitedBy: t.relation('invitedBy'),
    };
  },
});
