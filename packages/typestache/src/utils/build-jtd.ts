import { get, set } from 'lodash';
import { AST, Schema } from '../types';

const RE_OBJECT = /object/;

export function buildJtd(ast: AST) {
  const schema = {} as Schema;
  const astKeys = Object.keys(ast).sort((a, b) => a.localeCompare(b));

  for (const astKey of astKeys) {
    const segments = astKey.split('.');
    const processed: string[] = [];
    const workingPath: string[] = [];

    const process = (segment: string) => {
      const prevPath = processed.join('.');
      const prev = ast[prevPath] ?? ['object', false];

      processed.push(segment);
      const checkPath = processed.join('.');
      const astItem = ast[checkPath] ?? ['object', false];

      let value = {};
      const [type, optional] = astItem;
      const [prevType] = prev;

      if (!workingPath.length || RE_OBJECT.test(prevType)) {
        workingPath.push(optional ? 'optionalProperties' : 'properties');
      }

      workingPath.push(segment);

      if (type === 'value[]') {
        workingPath.push('elements');
      }

      if (type === 'object[]') {
        workingPath.push('elements');
      }

      const path = workingPath.join('.');
      if (get(schema, path)) return;
      set(schema, path, value);
    };

    for (const segment of segments) {
      process(segment);
    }
  }

  return schema;
}
