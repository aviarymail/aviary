import { createSignal } from 'solid-js';
import { SchemaInput } from './schema-input';

export const CustomTemplateEditor = () => {
  const [markup, setMarkup] = createSignal(`
    {{#each account.user}}
      {{name}}
      {{#with cars}}
        {{#if make}}
          {{make}}
        {{/if}}
        {{color.interior}}
      {{/with}}
    {{/each}}
  `);

  return (
    <section className="flex">
      <div className="w-1/3">
        <SchemaInput markup={markup} />
      </div>
      <div className="w-2/3">
        <textarea
          className="font-mono bg-gray-100 p-5"
          value={markup()}
          onInput={e => setMarkup(e.currentTarget.value)}
        />
      </div>
    </section>
  );
};
