// @refresh reload

import { Links, Meta, Outlet, Scripts } from 'solid-start/components';
import { Header } from './components/module/header';

export default function Root() {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body class="bg-white text-black">
        <div class="flex flex-col min-h-screen w-full">
          <Header />
          <div class="flex flex-col h-full flex-1">
            <Outlet />
          </div>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
