import { Title } from 'solid-meta';
import { createMutation, gql } from 'solid-urql';
import { object, output, string } from 'zod';

import { SignUpDocument } from '~/gql.types';
import { createForm } from '~/hooks/create-form';
import { Button } from '~/components/base/button';
import { TextInput } from '~/components/base/text-input';

gql`
  mutation SignUp($input: SignupInput!) {
    signup(input: $input) {
      success
    }
  }
`;

const schema = object({
  email: string().email(),
  firstName: string(),
  lastName: string(),
});

export default function SignupPage() {
  const [_state, signup] = createMutation(SignUpDocument);
  const { form, errors, isSubmitting } = createForm<output<typeof schema>>({
    schema,
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
    },
    onSubmit: async input => {
      await new Promise(r => setTimeout(r, 1000));
      try {
        await signup({ input });
      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <>
      <Title>Sign Up | Aviary Mail</Title>

      <main className="m-auto max-w-md w-full pb-40">
        <form use:form>
          <TextInput name="email" label="Email Address" error={errors.email} />

          <div className="flex space-x-5 mt-5">
            <TextInput
              name="firstName"
              label="First Name"
              placeholder=""
              error={errors.firstName}
            />
            <TextInput name="lastName" label="Last Name" error={errors.lastName} />
          </div>

          <div className="flex mt-8">
            <Button
              variant="primary"
              type="submit"
              className="w-full"
              disabled={isSubmitting()}
              loading={isSubmitting()}
            >
              Sign Up
            </Button>
          </div>
        </form>
      </main>
    </>
  );
}
