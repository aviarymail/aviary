import { Component, ComponentProps, splitProps } from 'solid-js';

interface Props extends ComponentProps<'button'> {
  loading?: boolean;
  variant: 'primary' | 'secondary' | 'text';
}

export const Button: Component<Props> = p => {
  const [props, componentProps] = splitProps(p, ['variant', 'loading', 'className', 'children']);

  const primary = () => props.variant === 'primary';
  const secondary = () => props.variant === 'secondary';
  const text = () => props.variant === 'text';

  return (
    <>
      <button
        {...componentProps}
        classList={{
          'rounded-sm text-sm inline-flex flex-row items-center justify-center h-10 px-3 border transition-opacity':
            true,
          'bg-black text-white border-black': primary() && !componentProps.disabled,
          'bg-gray-100 text-gray-500 border-gray-100': primary() && componentProps.disabled,
          'text-black border-black border-opacity-20': secondary(),
          'text-black border-transparent': text(),
          'cursor-pointer opacity-90 hover:opacity-100 focus-visible:(opacity-100 underline)':
            !componentProps.disabled,
          'opacity-40': componentProps.disabled,
          [props.className]: Boolean(props.className),
        }}
      >
        {props.children}
      </button>
      {props.loading && <div>asd</div>}
    </>
  );
};
