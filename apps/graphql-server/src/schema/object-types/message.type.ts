import { MessageStatuses } from '@aviarymail/db';
import { builder } from '../schema-builder';

builder.prismaObject('Message', {
  findUnique({ id }) {
    return { id };
  },
  fields(t) {
    return {
      id: t.exposeID('id'),
      createdAt: t.expose('createdAt', { type: 'DateTime' }),
      updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
      prefab: t.exposeBoolean('prefab'),
      name: t.exposeString('name'),
      slug: t.exposeString('slug'),
      description: t.exposeString('description'),
      markup: t.exposeString('markup', { nullable: true }),
      css: t.exposeString('css', { nullable: true }),
      schema: t.exposeString('schema', { nullable: true }),
      status: t.expose('status', { type: MessageStatuses }),
      sent: t.exposeInt('sent'),
      category: t.exposeString('category'),

      // blocksetId: t.exposeString('blocksetId'),
      // blockset: t.relation('blockset'),

      // projectId: t.exposeString('projectId', { nullable: true }),
      // project: t.relation('project', { nullable: true }),
    };
  },
});
