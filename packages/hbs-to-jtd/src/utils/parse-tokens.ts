import { AST, Type } from '../types';

const RE_WITH = /#with\s+/;
const RE_EACH = /#each\s+/;
const RE_CLOSE_CONTEXT = /\/(with|each)/;
const RE_OPTIONAL = /#(if|unless)\s+/;
const RE_MID_THIS = /.?this.?/g;
const RE_TRAILING_THIS = /.?this$/g;

/**
 * Parse each tag to create an AST.
 * @param tokens
 */
export function parseTokens(tokens: string[]) {
  // We need to keep track of the work in progress AST as well as a context to store
  // our current deptth when dealing with nested tag that need to reference their parent.
  // It's "dirty" in that we clean `.?this.?` out of the keys after the initial run.
  const dirty: AST = {};
  const context: string[] = [];

  /**
   * Intelligently adds a key to the AST while potentially handling collisions.
   */
  function setKey(key: string, type: Type, optional: boolean) {
    // If we have values stored in context we need to append them in front.
    if (context.length && context[context.length - 1] !== key) {
      if (context.join('.') !== key) {
        key = `${context.join('.')}.${key}`;
      }
    }

    const existing = dirty[key];

    // If we have a key that doesn't exist in our AST it means we're dealing with an
    // object member that has yet to reference the parent object in the template.
    if (!existing) {
      // If key is empty and there are items in context we're dealing with
      // an instance of `this` that needs to reference it's parent.
      if (!key && context.length) {
        key = context[context.length - 1];
      }

      // Create/set the parent record and return early since we've determined its value.
      dirty[key] = [type, optional];
      return;
    }

    // We need previously existing values to determine if they should be overwritten.
    // Once an object is set as `optional` it is forever an optional value.
    let prevType = existing[0];
    let prevOptional = optional || existing[1];

    // If the previous type is a `value` we can safely overwrite it.
    if (prevType === 'value') {
      dirty[key] = [type, prevOptional];
    }
  }

  // Light the tires.
  for (let index = 0; index < tokens.length; index++) {
    let token = tokens[index];

    // If we're closing a contextual block remove it's related tag from the context.
    if (RE_CLOSE_CONTEXT.test(token)) {
      context.pop();
      continue;
    }

    // These tags have no structural effect on the schema.
    if (
      token === 'else' ||
      token.startsWith('/') ||
      token.startsWith('! ') ||
      token.startsWith('@')
    ) {
      continue;
    }

    // 'value' is the baseline and can be overwritten by any other type.
    let type: Type = 'value';
    // Until we see it in `if` or `unless` it's not considered optional.
    let optional = false;

    // Treating `if` and `unless` the same. We don't care about their individual
    // use-cases or logical implications, just the fact that they're conditional.
    if (RE_OPTIONAL.test(token)) {
      token = token.replace(RE_OPTIONAL, '');
      optional = true;
    }

    // We can assume that `when` tags reference objects. We need to
    // save it's key in context so it's children can append to it's path.
    if (RE_WITH.test(token)) {
      token = token.replace(RE_WITH, '');
      setKey(token, 'object', optional);
      context.push(token);
      continue;
    }

    // The only way to determine if something is an array is when it's associated
    // with an `each` tag. It's children are references by their `this` segment and
    // will append to it's path in context. We clean up all the `this` at the end.
    if (RE_EACH.test(token)) {
      token = token.replace(RE_EACH, '');
      context.push(token);
      setKey(context.join('.'), 'object[]', false);
      continue;
    }

    // Keys that include a period are accessing keys like you would in JS. We split the
    // key to get its individual path segments so that we can build the path up while
    // making sure we modify the parent as needed.
    if (token.includes('.')) {
      const keys = token.split('.');
      let key = '';

      // We stored the `key` outside of it so we can append to it's path then start looping.
      for (let index = 0; index < keys.length; index++) {
        // If they key contains a partial path append to it, otherwise start it.
        if (key) {
          key += `.${keys[index]}`;
        } else {
          key = keys[index];
        }

        // We only overwrite values so we check for that prior to deciding what the type is.
        // If it's not the last segment it's an object building up to the accessed value.
        if (type === 'value') {
          type = index === keys.length - 1 ? 'value' : 'object';
        }

        setKey(key, type, optional);
      }
      continue;
    }

    // If we've made it all the way down here it's just a `value` type :)
    setKey(token, type, optional);
  }

  // Clean out all of the 'this' references.
  const clean: AST = {};

  for (const dirtyKey in dirty) {
    const cleanKey = dirtyKey.replace(RE_TRAILING_THIS, '').replace(RE_MID_THIS, '.');
    const existing = clean[cleanKey];

    // If the key hasn't been added to the `clean` obkect add it in.
    if (!existing) {
      clean[cleanKey] = dirty[dirtyKey];
      continue;
    }

    // If the previous type is a `value` type we can safely overwrite it.
    if (existing[0] === 'value') {
      clean[cleanKey] = dirty[cleanKey];
    }
  }

  return clean;
}
