// @refresh reload

import { Links, Meta, Scripts } from 'solid-start/components';
import { App } from './app';

export default function Root() {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-white text-black">
        <App />
        <Scripts />
      </body>
    </html>
  );
}
