import { UserRolesEnum } from '../lib/enums';
import { builder } from '../schema-builder';

builder.prismaObject('User', {
  findUnique({ id, email }) {
    return { id, email };
  },
  fields(t) {
    return {
      id: t.exposeID('id'),
      createdAt: t.expose('createdAt', { type: 'DateTime' }),
      updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
      confirmedAt: t.expose('confirmedAt', { type: 'DateTime', nullable: true }),
      role: t.expose('role', { type: UserRolesEnum }),
      email: t.exposeString('email'),
      firstName: t.exposeString('firstName'),
      lastName: t.exposeString('lastName'),

      sessions: t.relation('sessions'),
      teamInvites: t.relation('teamInvites'),
      teamMemberships: t.relation('teamMemberships'),
    };
  },
});
