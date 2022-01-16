import { authService } from '../../services/auth-service';
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
  t.prismaField({
    type: 'User',
    authScopes: { public: true },
    args: {
      input: t.arg({ type: SignupInput }),
    },
    async resolve(query, _root, { input }, _ctx) {
      const { user, token } = await authService.signUp(input);

      // await this.emailService.requestEmailConfirmation({
      //   to: input.email,
      //   name: `${input.firstName} ${input.lastName}`,
      //   token,
      // });

      return user;
    },
  })
);
