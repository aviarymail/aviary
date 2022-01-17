import { createForm } from '@felte/solid';
import { validator, ValidatorConfig } from '@felte/validator-zod';
import { z } from 'zod';
import { Button } from '~/components/atoms/button';
import { TextInput } from '~/components/atoms/text-input';

const schema = z.object({
  email: z.string().min(1, 'Email is required').email(),
});

export default function Login() {
  const { form, errors } = createForm<z.infer<typeof schema>, ValidatorConfig>({
    extend: validator,
    validateSchema: schema,
    onSubmit(values) {
      console.log(values);
    },
  });

  return (
    <main class="m-auto max-w-sm w-full pb-40">
      <form use:form>
        <TextInput name="email" label="Email Address" error={errors.email} />
        <Button type="submit" class="mt-4">
          Login
        </Button>
      </form>
    </main>
  );
}
