import 'virtual:windi.css';
import './styles.css';
import { Outlet } from 'solid-start/components';
import { Provider } from 'solid-urql';

import { Header } from './components/module/header';
import { urql } from './lib/urql';

export const App = () => {
  return (
    <Provider value={urql}>
      <div class="flex flex-col min-h-screen w-full">
        <Header />
        <div class="flex flex-col h-full flex-1">
          <Outlet />
        </div>
      </div>
    </Provider>
  );
};
