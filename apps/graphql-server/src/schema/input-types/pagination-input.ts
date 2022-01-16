import { builder } from '../schema-builder';

export const PaginationInput = builder.inputType('PaginationInput', {
  fields: t => ({
    cursor: t.string({ required: false }),
    page: t.int({ required: false }),
    take: t.int({ required: false }),
    skip: t.int({ required: false }),
  }),
});
