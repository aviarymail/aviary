import 'virtual:windi.css';
import './styles.css';
import { Outlet } from 'solid-start/components';
import { gql, Provider } from 'solid-urql';

import { Header } from './components/module/header';
import { urql } from './lib/urql';
import { createSignal, onMount, Show } from 'solid-js';
import { MeDocument } from './gql.types';
import { setCurrentUser } from './lib/current-user-store';

gql`
  query Me {
    me {
      id
      email
      firstName
      lastName
    }
  }
`;

export const App = () => {
  const [loaded, setLoaded] = createSignal();

  onMount(() => {
    (async () => {
      const { data } = await urql.query(MeDocument).toPromise();
      if (data?.me) setCurrentUser({ loggedIn: true, ...data.me });
      setLoaded(true);
    })();
  });

  return (
    <Show when={loaded()}>
      <Provider value={urql}>
        <div className="flex flex-col min-h-screen w-full">
          <Header />
          <div className="flex flex-col h-full flex-1">
            <Outlet />
          </div>
        </div>
      </Provider>
    </Show>
  );
};
