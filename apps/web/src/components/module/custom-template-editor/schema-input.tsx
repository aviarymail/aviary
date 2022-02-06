import { parseTokens, tokenize } from '@aviarymail/hbs-to-jtd';
import { Accessor, Component, createEffect, createMemo, createSignal, For } from 'solid-js';

interface Props {
  markup: Accessor<string>;
}

const TYPE_ICONS: Record<string, string> = {
  object: '{}',
  string: 'abc',
  number: '123',
};

const TYPE_KEYS = Object.keys(TYPE_ICONS);

export const SchemaInput: Component<Props> = props => {
  const [numbers, setNumbers] = createSignal<string[]>([]);

  const inputs = createMemo(() => {
    const tokens = tokenize(props.markup());
    const ast = parseTokens(tokens);
    const keys = Object.keys(ast);
    const initialDepth = keys[0].split('.').length;

    return keys.map(key => {
      const [t] = ast[key];
      const isArray = t.includes('[]');
      const segments = key.split('.');
      const name = segments[segments.length - 1];
      const depth = segments.length - initialDepth;

      let type: string = t.replace(/\[\]/g, '');
      if (t === 'value') {
        type = numbers().includes(key) ? 'number' : 'string';
      }

      return { id: key, name, type, isArray, depth };
    });
  });

  createEffect(() => {
    console.log(inputs());
  });

  return (
    <ul className="font-mono">
      <For each={inputs()}>
        {input => (
          <li className="flex w-full items-center">
            <p className="flex h-full items-center">
              {input.depth && (
                <For each={new Array(input.depth).fill(null)}>
                  {(marker, index) => (
                    <span className="border-l flex h-full border-gray-300 w-4">&nbsp;</span>
                  )}
                </For>
              )}
              {input.name}
              {input.isArray && '[]'}
            </p>

            <div className="flex ml-auto space-x-1 items-center">
              <For each={TYPE_KEYS}>
                {key => (
                  <button
                    className="rounded-full flex h-10 w-10 items-center justify-center"
                    classList={{
                      'opacity-10': input.type !== key,
                      'bold bg-gray-50': input.type === key,
                    }}
                  >
                    {TYPE_ICONS[key]}
                  </button>
                )}
              </For>
            </div>
          </li>
        )}
      </For>
    </ul>
  );
};
