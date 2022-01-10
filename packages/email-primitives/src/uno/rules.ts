import { Rule } from '@unocss/core';
import { directionSize } from './utils';

// Email compatible rules
// [ ] background
// [ ] background-color
// [ ] border
// [ ] border-bottom
// [ ] border-bottom-color
// [ ] border-bottom-style
// [ ] border-bottom-width
// [ ] border-color
// [ ] border-left
// [ ] border-left-color
// [ ] border-left-style
// [ ] border-left-width
// [ ] border-right
// [ ] border-right-color
// [ ] border-right-style
// [ ] border-right-width
// [ ] border-style
// [ ] border-top
// [ ] border-top-color
// [ ] border-width
// [ ] color
// [ ] display
// [ ] font
// [ ] font-family
// [ ] font-size
// [ ] font-style
// [ ] font-variant
// [ ] font-weight
// [ ] height
// [ ] letter-spacing
// [ ] line-height
// [ ] list-style-type
// [x] padding
// [x] padding-bottom
// [x] padding-left
// [x] padding-right
// [x] padding-top
// [ ] table-layout
// [ ] text-align
// [ ] text-decoration
// [ ] text-indent
// [ ] text-transform
// [ ] vertical-align

export const rules: Rule[] = [
  // Padding
  [/^p-?([xy])-?(-?.+)$/, directionSize('padding')],
  [/^p-?([rltbse])-?(-?.+)$/, directionSize('padding')],

  // Width
];
