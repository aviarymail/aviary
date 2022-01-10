import { createValueHandler, CSSEntries, DynamicMatcher } from '@unocss/core';
import * as handlers from './handlers';

const h = createValueHandler(handlers);

const directionMap: Record<string, string[]> = {
  l: ['-left'],
  r: ['-right'],
  t: ['-top'],
  b: ['-bottom'],
  s: ['-inline-start'],
  e: ['-inline-end'],
  x: ['-left', '-right'],
  y: ['-top', '-bottom'],
  '': [''],
  a: [''],
};

export function directionSize(propertyPrefix: string): DynamicMatcher {
  return ([_, direction, size]: string[]): CSSEntries | undefined => {
    const v = h.bracket.auto.px.fraction.cssvar(size);
    if (v !== undefined) return directionMap[direction].map(i => [`${propertyPrefix}${i}`, v]);
  };
}
