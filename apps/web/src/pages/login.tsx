import { Title } from 'solid-meta';
import { object, output, string } from 'zod';
import { Button } from '~/components/atoms/button';
import { TextInput } from '~/components/atoms/text-input';
import { createForm } from '~/hooks/create-form';

const schema = object({
  email: string().min(1, 'Email is required').email(),
});

export default function Login() {
  const { handleSubmit, bindInput, state } = createForm<output<typeof schema>>({
    schema,
    intitialValues: {
      email: '',
    },
    onSubmit(values) {
      console.log(values);
    },
  });

  return (
    <>
      <Title>Login | Aviary Mail</Title>

      <main class="m-auto max-w-xs w-full pb-40">
        <form onSubmit={handleSubmit}>
          <TextInput
            name="email"
            label="Email Address"
            placeholder="you@email.com"
            {...bindInput('email')}
          />

          <div class="flex mt-3">
            <Button
              variant="primary"
              type="submit"
              className="w-full"
              disabled={!state.valid}
              loading={state.loading}
            >
              Login
            </Button>
          </div>
        </form>
      </main>
    </>
  );
}
