import { Component, ComponentProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';

interface Props extends Pick<ComponentProps<'p'>, 'class' | 'dir' | 'id' | 'style'> {
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const Text: Component<Props> = props => {
  return <Dynamic {...props} component={props.as || 'p'} />;
};
