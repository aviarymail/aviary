import { createForm } from '@felte/solid';
import { validator, ValidatorConfig } from '@felte/validator-zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().min(1, 'Email is required').email(),
});

export function createLoginForm() {
  const form = createForm<z.infer<typeof schema>, ValidatorConfig>({
    extend: [validator],
    validateSchema: schema,
    onSubmit(values) {
      console.log(values.email);
      return;
    },
  });

  return form;
}
