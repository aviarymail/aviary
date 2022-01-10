import { Component, ComponentProps } from 'solid-js';

interface Props extends ComponentProps<'img'> {}

export const Image: Component<Props> = props => {
  return <img {...props} />;
};
