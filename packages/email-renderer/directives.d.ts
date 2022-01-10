import 'solid-js';
import { JSXElement, Setter } from 'solid-js';

declare module 'solid-js' {
  export type UnoDirectiveValue = [JSXElement, Setter<string>];

  namespace JSX {
    interface Directives {
      uno: UnoDirectiveValue;
    }
  }
}
