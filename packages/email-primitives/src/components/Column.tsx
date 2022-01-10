import { Component, ComponentProps } from 'solid-js';

interface Props extends ComponentProps<'td'> {}

export const Column: Component<Props> = props => {
  return <td {...props}>{props.children}</td>;
};
