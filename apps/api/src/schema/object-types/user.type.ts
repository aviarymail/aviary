import { prisma } from '../../lib/prisma';
import { builder } from '../schema-builder';

export interface IUser {
  id: string;
  token?: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
}

export const UserType = builder.objectRef<IUser>('User');

UserType.implement({
  fields: t => ({
    id: t.exposeID('id'),
    token: t.exposeString('token', { nullable: true }),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
    email: t.exposeString('email'),
  }),
});

function _load(id: string) {
  return prisma.user.findUnique({
    where: { id },
  });
}
