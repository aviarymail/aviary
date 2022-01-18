import 'virtual:windi.css';
import './styles.css';
import { Outlet } from 'solid-start/components';
import { Header } from './components/module/header';

export const App = () => {
  return (
    <div class="flex flex-col min-h-screen w-full">
      <Header />
      <div class="flex flex-col h-full flex-1">
        <Outlet />
      </div>
    </div>
  );
};
