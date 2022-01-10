import { createGenerator } from '@unocss/core';
import { rules } from './rules';

const generator = createGenerator({
  rules,
});

export async function generateCss(code: string | Set<string>) {
  const { css } = await generator.generate(code, {
    scope: '#aviarymail-container',
  });

  return css;
}
