import { Component, ComponentProps, splitProps } from 'solid-js';

interface Props extends ComponentProps<'button'> {
  loading?: boolean;
  variant: 'primary' | 'secondary' | 'text';
}

export const Button: Component<Props> = p => {
  const [props, componentProps] = splitProps(p, [
    'variant',
    'disabled',
    'loading',
    'className',
    'children',
  ]);

  return (
    <button
      {...componentProps}
      disabled={props.disabled || props.loading}
      classList={{
        'relative rounded-sm text-sm inline-flex flex-row items-center justify-center h-10 px-3 border transition-opacity':
          true,
        'bg-black text-white border-black': props.variant === 'primary' && !props.disabled,
        'bg-black text-gray-500 border-gray-100': props.variant === 'primary' && props.disabled,
        'text-black border-black border-opacity-20': props.variant === 'secondary',
        'text-black border-transparent': props.variant === 'text',
        'cursor-pointer opacity-90 hover:opacity-100 focus-visible:(opacity-100 underline)':
          !props.disabled,
        'opacity-70': props.disabled,
        [String(props.className)]: Boolean(props.className),
      }}
    >
      <span classList={{ 'opacity-0': props.loading }}>{props.children}</span>
      {props.loading && (
        <span
          classList={{
            'flex inset-0 absolute items-center justify-center': true,
            'text-white': props.variant === 'primary',
            'text-black': props.variant !== 'primary',
          }}
        >
          Loading...
        </span>
      )}
    </button>
  );
};
