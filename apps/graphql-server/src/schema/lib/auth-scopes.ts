import { ISchemaBuilder } from '../schema-builder.interface';

export function authScopes(ctx: ISchemaBuilder['Context']) {
  return {
    public: true,
    loggedIn: Boolean(ctx.currentUserId),
  };
}
