import { Title } from 'solid-meta';
import { createMutation, gql } from 'solid-urql';
import { object, output, string } from 'zod';

import { VerifyLoginCodeDocument } from '~/gql.types';
import { createForm } from '~/hooks/create-form';
import { Button } from '~/components/base/button';
import { TextInput } from '~/components/base/text-input';
import { useNavigate, useSearchParams } from 'solid-app-router';
import { onMount } from 'solid-js';
import { setCurrentUser } from '~/lib/current-user-store';

gql`
  mutation VerifyLoginCode($email: String!, $code: String!) {
    verifyLoginCode(email: $email, code: $code) {
      id
      email
      firstName
      lastName
    }
  }
`;

const schema = object({
  email: string().email(),
  code: string(),
});

export default function VerifyPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [_state, verify] = createMutation(VerifyLoginCodeDocument);
  const { form, errors, isSubmitting, setFields, handleSubmit } = createForm<output<typeof schema>>(
    {
      schema,
      initialValues: {
        email: params.email ?? '',
        code: params.code ?? '',
      },
      onSubmit: async values => {
        try {
          const { data } = await verify(values);

          if (data?.verifyLoginCode) {
            setCurrentUser({ loggedIn: true, ...data.verifyLoginCode });
            navigate('/dashboard');
          }
        } catch (err) {
          console.error(err);
        }
      },
    }
  );

  onMount(() => {
    setFields({ email: params.email, code: params.code });

    if (params.email && params.code) {
      handleSubmit();
    }
  });

  return (
    <>
      <Title>Verify Login Code | Aviary Mail</Title>

      <main className="m-auto max-w-xs w-full pb-40">
        <form use:form>
          <TextInput name="email" label="Email Address" error={errors.email} />
          <TextInput
            name="code"
            label="Code"
            placeholder="XXXXXX"
            containerClassName="mt-5"
            error={errors.code}
          />

          <div className="flex mt-8">
            <Button variant="primary" type="submit" className="w-full" loading={isSubmitting()}>
              Verify Code
            </Button>
          </div>
        </form>
      </main>
    </>
  );
}
