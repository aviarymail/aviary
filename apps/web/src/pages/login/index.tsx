import { useNavigate } from 'solid-app-router';
import { Title } from 'solid-meta';
import { createMutation, gql } from 'solid-urql';
import { object, output, string } from 'zod';

import { RequestLoginCodeDocument } from '~/gql.types';
import { createForm } from '~/hooks/create-form';
import { Button } from '~/components/base/button';
import { TextInput } from '~/components/base/text-input';

const schema = object({
  email: string().email(),
});

gql`
  mutation RequestLoginCode($email: String!) {
    requestLoginCode(email: $email) {
      success
    }
  }
`;

export default function LoginPage() {
  const navigate = useNavigate();
  const [_state, verify] = createMutation(RequestLoginCodeDocument);
  const { form, errors, isSubmitting } = createForm<output<typeof schema>>({
    schema,
    initialValues: {
      email: '',
    },
    onSubmit: async values => {
      try {
        const res = await verify(values);

        if (res.data?.requestLoginCode.success) {
          navigate(`/login/verify?email=${values.email}`);
        }
      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <>
      <Title>Login | Aviary Mail</Title>

      <main className="m-auto max-w-xs w-full pb-40">
        <form use:form>
          <TextInput
            name="email"
            label="Email Address"
            placeholder="you@email.com"
            error={errors.email}
          />

          <div className="flex mt-3">
            <Button variant="primary" type="submit" className="w-full" loading={isSubmitting()}>
              Login
            </Button>
          </div>
        </form>
      </main>
    </>
  );
}
