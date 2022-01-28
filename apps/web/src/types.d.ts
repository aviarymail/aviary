import { JSX } from 'solid-js';

declare module 'solid-js' {
  namespace JSX {
    interface Directives {
      form: boolean;
      input: boolean;
    }
  }
}
