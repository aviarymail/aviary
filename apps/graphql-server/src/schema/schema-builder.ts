// https://pothos-graphql.dev/
import { db } from '@aviarymail/db';
import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import ScopeAuthPlugin from '@pothos/plugin-scope-auth';
import ValidationPlugin from '@pothos/plugin-validation';
import { authScopes } from './lib/auth-scopes';
import { ISchemaBuilder } from './schema-builder.interface';

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
