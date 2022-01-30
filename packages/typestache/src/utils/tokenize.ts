const RE_TAG = /\{+\s*(.*?)\s*\}+/g;

/**
 * Extract all of the tag tokens from the template.
 * @param tpl
 */
export function tokenize(tpl: string) {
  let tags = [];
  let matches;

  while ((matches = RE_TAG.exec(tpl))) {
    if (matches) {
      tags.push(matches[1]);
    }
  }

  return tags;
}
