// https://giraphql.com/
import SchemaBuilder from '@giraphql/core';
import ScopeAuthPlugin from '@giraphql/plugin-scope-auth';
import { ISchemaBuilder } from './schema-builder.interface';

export const builder = new SchemaBuilder<ISchemaBuilder>({
  defaultInputFieldRequiredness: true,
  plugins: [ScopeAuthPlugin],
  authScopes: ctx => {
    return {
      public: true,
      loggedIn: Boolean(ctx.currentUserId),
    };
  },
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

// builder.subscriptionType({});

/**
 * Register custom scalars
 */

builder.scalarType('DateTime', {
  serialize: (date: Date) => date.toISOString(),
  parseValue: (date: string) => new Date(date),
});
