import { tokenize } from './utils/tokenize';
import { parseTokens } from './utils/parse-tokens';
import { buildJtd } from './utils/build-jtd';

/**
 * Generate JSON Typedef out of a handlebars template.
 * @param tpl
 */
export function generateJtdSchema(tpl: string) {
  const tokens = tokenize(tpl);
  const ast = parseTokens(tokens);
  return buildJtd(ast);
}
