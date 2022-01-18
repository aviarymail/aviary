import { createForm } from '@felte/solid';
import { validator, ValidatorConfig } from '@felte/validator-zod';
import { Title } from 'solid-meta';
import { z } from 'zod';
import { Button } from '~/components/atoms/button';
import { TextInput } from '~/components/atoms/text-input';

const schema = z.object({
  email: z.string().min(1, 'Email is required').email(),
});

export default function Login() {
  const { form, errors, isValid } = createForm<z.infer<typeof schema>, ValidatorConfig>({
    extend: validator,
    validateSchema: schema,
    onSubmit(values) {
      console.log(values);
    },
  });

  return (
    <>
      <Title>Login | Aviary Mail</Title>

      <main class="m-auto max-w-xs w-full pb-40">
        <form use:form>
          <TextInput
            name="email"
            label="Email Address"
            placeholder="you@email.com"
            error={errors.email}
          />

          <div class="flex mt-3">
            <Button variant="primary" type="submit" class="w-full" disabled={!isValid()}>
              Login
            </Button>
          </div>
        </form>
      </main>
    </>
  );
}
