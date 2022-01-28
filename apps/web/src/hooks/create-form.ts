import { JSX } from 'solid-js';
import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import { ZodError, ZodSchema } from 'zod';
import { serializeForm } from '~/lib/serialize-form';

interface Params<T extends {}> {
  schema: ZodSchema<T>;
  onSubmit?(values: T): void | Promise<void>;
  intitialValues?: T;
}

type Errors<T extends {}> = Partial<Record<keyof T, string[]>>;

export function createForm<T extends {}>(params: Params<T>) {
  const [state, setState] = createStore({ loading: false, touched: false, valid: false });
  const [values, setValues] = createSignal<T>(params.intitialValues);
  const [errors, setErrors] = createSignal<Errors<T>>({});

  function validate() {
    try {
      params.schema.parse(values());
      setErrors({});
      setState({ valid: true });
      return true;
    } catch (e) {
      if (e instanceof ZodError) {
        if (state.touched) {
          setErrors(() => e.flatten().fieldErrors);
        }
        setState({ valid: false });
        return false;
      }
    }
  }

  const handleSubmit: JSX.EventHandler<HTMLFormElement, Event> = async e => {
    e.preventDefault();
    setState({ loading: true, touched: true });

    const formValues = serializeForm<T>(e.currentTarget);
    const nextValues = { ...formValues, ...values() };
    setValues(() => nextValues);
    const valid = validate();

    if (valid) {
      await params.onSubmit?.(values());
    }

    setState({ loading: false });
  };

  function setValue(name: keyof T, value: string | number) {
    setValues(() => ({ ...values(), [name]: value }));
    validate();
  }

  function error(name: keyof T) {
    return errors()[name];
  }

  function value(name: keyof T) {
    return values()[name] ?? params.intitialValues[name];
  }

  function bindInput(name: keyof T) {
    return {
      value: value(name),
      onTextChange: value => setValue(name, value),
      error: error(name),
    };
  }

  return {
    state,
    value,
    values,
    error,
    errors,
    setValue,
    handleSubmit,
    bindInput,
  };
}
