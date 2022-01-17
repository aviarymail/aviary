// @refresh reload
import 'virtual:windi.css';
import './styles.css';

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
        <Header />
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
