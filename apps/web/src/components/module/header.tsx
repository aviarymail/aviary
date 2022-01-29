import { NavLink } from 'solid-app-router';
import { createMutation, gql } from 'solid-urql';
import { LogoutDocument } from '~/gql.types';
import { currentUser, setCurrentUser } from '~/lib/current-user-store';
import { IconLeave } from '../svg/icon-leave.svg';
import { Wordmark } from '../svg/wordmark.svg';

gql`
  mutation Logout {
    logout {
      success
    }
  }
`;

export const Header = () => {
  const [_, logout] = createMutation(LogoutDocument);

  async function handleLogout() {
    try {
      await logout();
      setCurrentUser({ loggedIn: false });
    } catch (err) {
      console.error();
    }
  }

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

      {!currentUser.loggedIn && (
        <nav class="ml-auto space-x-10 text-sm">
          <NavLink href="/login" class="text-black" activeClass="nunderline">
            Login
          </NavLink>
          <NavLink href="/signup" class="text-black" activeClass="nunderline">
            Sign Up
          </NavLink>
        </nav>
      )}

      {currentUser.loggedIn && (
        <nav class="ml-auto space-x-10 text-sm">
          <button aria-label="Logout" onClick={handleLogout}>
            <IconLeave />
          </button>
        </nav>
      )}
    </header>
  );
};
