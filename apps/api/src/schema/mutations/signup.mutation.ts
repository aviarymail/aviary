import { authService } from '../../services/auth-service';
import { UserType } from '../object-types/user.type';
import { builder } from '../schema-builder';

const SignupInput = builder.inputType('SignupInput', {
  fields: t => ({
    email: t.string(),
    password: t.string(),
    confirmation: t.string(),
    firstName: t.string(),
    lastName: t.string(),
    username: t.string(),
  }),
});

builder.mutationField('signup', t =>
  t.field({
    type: UserType,
    authScopes: { public: true },
    args: {
      input: t.arg({ type: SignupInput }),
    },
    async resolve(_root, { input }, _ctx) {
      const { user, token } = await authService.signUp(input);

      // await this.emailService.requestEmailConfirmation({
      //   to: input.email,
      //   name: `${input.firstName} ${input.lastName}`,
      //   token,
      // });

      return user;
    },
  }),
);
