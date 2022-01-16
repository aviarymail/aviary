import { Component, ComponentProps, Show } from 'solid-js';
import { DeepReadonly } from 'solid-js/store';

interface Props extends ComponentProps<'input'> {
  name: string;
  label?: string;

  /**
   * Felte errors. Coming from Zod they'll be `Record<string, string[] | null>`
   */
  errors?: any;
}

export const TextInput: Component<Props> = props => {
  const error = () => {
    return props.errors?.[props.name] ? props.errors[props.name][0] : undefined;
  };

  return (
    <div>
      {props.label && <label>{props.label}</label>}
      <input {...props} className="bg-gray-100 placeholder-gray-400" />
      {error() && <p className="">{error()}</p>}
    </div>
  );
};
