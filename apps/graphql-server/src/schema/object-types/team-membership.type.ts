import { TeamRoles } from '@aviarymail/db';
import { builder } from '../schema-builder';

export const $TeamMembership = builder.prismaObject('TeamMembership', {
  findUnique({ id }) {
    return { id };
  },
  fields(t) {
    return {
      id: t.exposeID('id'),
      createdAt: t.expose('createdAt', { type: 'DateTime' }),
      updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
      role: t.expose('role', { type: TeamRoles }),

      userId: t.exposeID('userId'),
      user: t.relation('user'),
      teamId: t.exposeID('teamId'),
      team: t.relation('team'),
    };
  },
});
