import { builder } from '../schema-builder';

builder.objectType('SuccessResponse', {
  fields(t) {
    return {
      success: t.exposeBoolean('success'),
    };
  },
});
