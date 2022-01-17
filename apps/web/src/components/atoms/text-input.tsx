import { Component, ComponentProps } from 'solid-js';

interface Props extends ComponentProps<'input'> {
  name: string;
  label?: string;

  /**
   * Felte errors. Coming from Zod they'll be `Record<string, string[] | null>`
   */
  error?: any;
}

export const TextInput: Component<Props> = props => {
  return (
    <div class="flex flex-col">
      {props.label && (
        <label for={props.name} class="text-xs mb-2 w-full uppercase">
          {props.label}
        </label>
      )}

      <input
        {...props}
        id={props.id || props.name}
        class="bg-gray-100 py-2 px-3 placeholder-gray-400"
        classList={{ 'bg-red-50': props.error }}
      />

      <div class="h-4 mt-2">
        {props.error && (
          <p class="text-sm text-red-700">
            {typeof props.error === 'string' ? props.error : props.error[0]}
          </p>
        )}
      </div>
    </div>
  );
};
