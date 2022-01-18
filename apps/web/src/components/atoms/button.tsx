import { Component, ComponentProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';

interface Props extends ComponentProps<'button'> {
  variant: 'primary' | 'secondary' | 'text';
}

export const Button: Component<Props> = props => {
  const primary = () => props.variant === 'primary';
  const secondary = () => props.variant === 'secondary';
  const text = () => props.variant === 'text';
  const disabled = () => props.disabled;

  return (
    <Dynamic
      {...props}
      component="button"
      classList={{
        'rounded-sm text-sm inline-flex flex-row items-center justify-center h-10 px-3 border transition-opacity':
          true,
        'bg-black text-white border-black': primary() && !disabled(),
        'bg-gray-100 text-gray-500 border-gray-100': primary() && disabled(),
        'text-black border-black border-opacity-20': secondary(),
        'text-black border-transparent': text(),
        'cursor-pointer opacity-90 hover:opacity-100 focus-visible:(opacity-100 underline)':
          !disabled(),
        'opacity-40': disabled(),
        [props.class]: Boolean(props.class),
      }}
    >
      {props.children}
    </Dynamic>
  );
};
