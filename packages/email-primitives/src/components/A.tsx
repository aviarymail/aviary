import { Component, ComponentProps } from 'solid-js';

interface Props extends Pick<ComponentProps<'a'>, 'class' | 'href' | 'id' | 'style'> {}

export const A: Component<Props> = props => {
  return <a {...props} target="_blank" />;
};
