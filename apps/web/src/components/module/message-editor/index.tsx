import { createSignal, For, Match, onCleanup, onMount, Switch } from 'solid-js';
import { blocks, setBlocks } from './message-editor.atoms';

enum EditorModes {
  VISUAL,
  CODE,
  PREVIEW,
}

export const MessageEditor = () => {
  const [mode, setMode] = createSignal(EditorModes.VISUAL);

  onMount(() => {
    setBlocks([
      {
        name: 'Paragraph',
        template: `
          <p class="mb-4">{{body}}</p>
        `,
      },
      {
        name: 'User Name',
        template: `
          <p>{{user.firstName}} {{user.lastName}}</p>
        `,
      },
    ]);
  });

  onCleanup(() => {
    setBlocks([]);
  });

  return (
    <section className="flex w-full">
      <div className="mr-20 w-1/3">
        <ol className="space-y-5">
          <For each={blocks()}>
            {block => {
              return (
                <div className="rounded shadow p-3">
                  <p className="text-xs mb-2 uppercase">{block.name}</p>
                  {JSON.stringify(block)}
                </div>
              );
            }}
          </For>
        </ol>
      </div>
      <div className="w-2/3">
        <div className="flex space-x-5">
          <button onClick={() => setMode(EditorModes.VISUAL)}>Visual</button>
          <button onClick={() => setMode(EditorModes.CODE)}>Code</button>
          <button onClick={() => setMode(EditorModes.PREVIEW)}>Preview</button>
        </div>

        <Switch>
          <Match when={mode() === EditorModes.VISUAL}>
            <p>vis</p>
          </Match>
          <Match when={mode() === EditorModes.CODE}>
            <p>code</p>
          </Match>
          <Match when={mode() === EditorModes.PREVIEW}>
            <p>asd</p>
          </Match>
        </Switch>
      </div>
    </section>
  );
};
