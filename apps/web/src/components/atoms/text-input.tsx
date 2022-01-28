import { Component, ComponentProps, Show } from 'solid-js';

interface Props extends ComponentProps<'input'> {
  name: string;
  label?: string;
  error?: string[];
  onTextChange?(value: string): void;
}

export const TextInput: Component<Props> = props => {
  return (
    <div class="flex flex-col">
      <Show when={props.label}>
        <label for={props.name} class="text-xs mb-2 w-full uppercase">
          {props.label}
        </label>
      </Show>

      <input
        {...props}
        id={props.id || props.name}
        class="border rounded-sm bg-gray-100 border-gray-100 py-2 px-3 placeholder-gray-400"
        classList={{ 'border-red-400': Boolean(props.error) }}
        onInput={e => props.onTextChange?.(e.currentTarget.value)}
      />

      <Show when={props.error}>
        <div class="mt-2 min-h-4">
          <p class="text-sm text-red-700">
            {typeof props.error === 'string' ? props.error : props.error[0]}
          </p>
        </div>
      </Show>
    </div>
  );
};
