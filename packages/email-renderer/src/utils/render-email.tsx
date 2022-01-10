import { renderToString } from 'solid-js/web';

export function renderEmail() {
  const html = renderToString(() => <div>asdf</div>);
  console.log(html);
}
