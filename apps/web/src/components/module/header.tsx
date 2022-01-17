import 'virtual:windi.css';
import '../../styles.css';
import { NavLink } from 'solid-app-router';
import { Wordmark } from '../svg/wordmark.svg';

export const Header = () => {
  return (
    <header class="container flex flex-r-w mx-auto py-10 items-center">
      <p class="mr-20">
        <NavLink href="/" class="text-black" end>
          <Wordmark />
        </NavLink>
      </p>

      <nav class="space-x-10 text-sm">
        <NavLink href="/" class="text-black" activeClass="underline" end>
          Home
        </NavLink>
      </nav>

      <nav class="ml-auto space-x-10 text-sm">
        <NavLink href="/login" class="text-black" activeClass="nunderline">
          Login
        </NavLink>
        <NavLink href="/signup" class="text-black" activeClass="nunderline">
          Sign Up
        </NavLink>
      </nav>
    </header>
  );
};
