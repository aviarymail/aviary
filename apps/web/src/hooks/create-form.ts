import { FormConfig } from '@felte/core';
import { createForm as felte, Form } from '@felte/solid';
import { validator } from '@felte/validator-zod';
import { ZodSchema } from 'zod';
import { Merge } from 'type-fest';

interface Params<T extends {}> extends FormConfig<T> {
  schema: ZodSchema<T>;
}

type FormWithZodErrors<T> = Merge<Form<T>, { errors: Record<keyof T, string[]> }>;

export function createForm<T extends {}>(params: Params<T>): FormWithZodErrors<T> {
  console.log(params.initialValues);
  return felte<T>({
    ...params,
    extend: validator,
    validateSchema: params.schema,
  }) as FormWithZodErrors<T>;
}
