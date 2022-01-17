import { Component, ComponentProps } from 'solid-js';

interface Props extends ComponentProps<'button'> {}

export const Button: Component<Props> = props => {
  return (
    <button {...props} class={`bg-black rounded-sm text-white text-sm py-2 px-3 ${props.class}`}>
      {props.children}
    </button>
  );
};
