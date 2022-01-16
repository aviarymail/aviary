import { createEffect } from 'solid-js';
import { TextInput } from '../../components/text-input';
import { createLoginForm } from './login.form';

export default function Login() {
  const { form, errors } = createLoginForm();

  return (
    <form use:form>
      <TextInput name="email" errors={errors} />
    </form>
  );
}
