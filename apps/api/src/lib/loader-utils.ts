import { ISchemaBuilder } from '../schema/schema-builder.interface';

interface LoaderUtilParams<
  TParent extends Record<string, any>,
  TChild extends Record<string, any>,
  TParams = {},
  TContext = ISchemaBuilder['Context'],
> {
  queries: Array<{
    obj: TParent;
    params: TParams;
  }>;
  items: TChild[];
  parentKey: keyof TParent;
  childKey: keyof TChild;
  context?: TContext;
}

export const loaderUtils = new (class LoaderUtils {
  lookupObj<
    TParent extends Record<string, any>,
    TChild extends Record<string, any>,
    TParams = {},
  >(params: LoaderUtilParams<TParent, TChild, TParams>) {
    const lookup: Record<string, TChild> = {};

    for (const item of params.items) {
      const lookupKey = item[params.childKey];
      lookup[lookupKey] = item;
    }

    return params.queries.map(q => lookup[q.obj[params.parentKey]]);
  }

  lookupArr<
    TParent extends Record<string, any>,
    TChild extends Record<string, any>,
    TParams = {},
  >(params: LoaderUtilParams<TParent, TChild, TParams>) {
    const lookup: Record<string, TChild[]> = {};

    for (const item of params.items) {
      const lookupKey = item[params.childKey];

      if (lookup[lookupKey]) {
        lookup[lookupKey].push(item);
      } else {
        lookup[lookupKey] = [item];
      }
    }

    return params.queries.map(q => lookup[q.obj[params.parentKey]] ?? []);
  }
})();
