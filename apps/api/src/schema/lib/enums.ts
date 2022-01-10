import { UserRoles } from '@prisma/client';
import { builder } from '../schema-builder';

export const UserRolesEnum = builder.enumType(UserRoles, {
  name: 'UserRoles',
});
