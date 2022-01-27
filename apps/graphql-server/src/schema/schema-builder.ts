// https://pothos-graphql.dev/
import SchemaBuilder from '@pothos/core';
import ScopeAuthPlugin from '@pothos/plugin-scope-auth';
import PrismaPlugin from '@pothos/plugin-prisma';
import ValidationPlugin from '@pothos/plugin-validation';
import { db } from '@aviarymail/db';

import { ISchemaBuilder } from './schema-builder.interface';
import { authScopes } from './lib/auth-scopes';

export const builder = new SchemaBuilder<ISchemaBuilder>({
  defaultInputFieldRequiredness: true,
  plugins: [ScopeAuthPlugin, PrismaPlugin, ValidationPlugin],
  prisma: { client: db },
  authScopes,
});

/**
 * Register types and auth scopts
 */

builder.queryType({
  authScopes: { loggedIn: true },
});

builder.mutationType({
  authScopes: { loggedIn: true },
});

/**
 * Register custom scalars
 */

builder.scalarType('DateTime', {
  serialize: (date: Date) => date.toISOString(),
  parseValue: (date: any) => new Date(date),
});
