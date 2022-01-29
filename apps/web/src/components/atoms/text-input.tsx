import { Component, ComponentProps, Show } from 'solid-js';

interface Props extends ComponentProps<'input'> {
  name: string;
  label?: string;
  error?: string[];
  containerClassName?: string;
  onTextChange?(value: string): void;
}

export const TextInput: Component<Props> = props => {
  return (
    <div className={`flex flex-col w-full ${props.containerClassName}`}>
      <Show when={props.label}>
        <label for={props.name} className="text-xs mb-2 w-full uppercase">
          {props.label}
        </label>
      </Show>

      <input
        {...props}
        id={props.id || props.name}
        className="border rounded-sm bg-gray-100 border-gray-100 w-full py-2 px-3 placeholder-gray-400"
        classList={{ 'border-red-400': Boolean(props.error) }}
        onInput={e => props.onTextChange?.(e.currentTarget.value)}
      />

      <Show when={props.error}>
        <div className="mt-2 min-h-4">
          <p className="text-sm text-red-700">
            {typeof props.error === 'string' ? props.error : props.error?.[0]}
          </p>
        </div>
      </Show>
    </div>
  );
};
