import { Schema } from './types';
import { buildJtd } from './utils/build-jtd';
import { parseTokens } from './utils/parse-tokens';
import { tokenize } from './utils/tokenize';

/**
 * Generate JSON Typedef out of a handlebars template.
 * @param tpl
 */
export function generateJtdSchema(tpl: string): Schema {
  const tokens = tokenize(tpl);
  const ast = parseTokens(tokens);
  return buildJtd(ast);
}
