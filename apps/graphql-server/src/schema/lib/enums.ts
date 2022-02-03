import { MessageStatuses, TeamRoles, UserRoles } from '@aviarymail/db';
import { builder } from '../schema-builder';

export const TeamRolesEnum = builder.enumType(TeamRoles, {
  name: 'TeamRoles',
});

export const UserRolesEnum = builder.enumType(UserRoles, {
  name: 'UserRoles',
});

export const MessageStatusesEnum = builder.enumType(MessageStatuses, {
  name: 'MessageStatuses',
});
