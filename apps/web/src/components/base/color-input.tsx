import { Component, ComponentProps, Show } from 'solid-js';

interface Props extends ComponentProps<'input'> {
  name: string;
  label?: string;
  error?: string[];
  containerClassName?: string;
  onTextChange?(value: string): void;
  onColorChange?(value: string): void;
}

export const ColorInput: Component<Props> = props => {
  return (
    <div className={`flex flex-col w-full ${props.containerClassName}`}>
      <Show when={props.label}>
        <label for={props.name} className="text-xs mb-2 w-full uppercase">
          {props.label}
        </label>
      </Show>

      <div className="relative">
        <input
          {...props}
          id={props.id || props.name}
          className="border rounded-sm bg-gray-100 border-gray-100 w-full py-2 px-3 placeholder-gray-400"
          classList={{ 'border-red-400': Boolean(props.error) }}
          onInput={e => props.onTextChange?.(e.currentTarget.value)}
        />
        <div className="absolute right-1 bottom-1 h-8 w-8 rounded overflow-hidden">
          <input
            type="color"
            className="absolute -top-1 -left-1 w-10 h-10"
            value={props.value}
            onInput={e => props.onColorChange?.(e.currentTarget.value)}
          />
        </div>
      </div>
    </div>
  );
};
