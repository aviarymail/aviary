import { NavLink, useNavigate } from 'solid-app-router';
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
  const navigate = useNavigate();
  const [_, logout] = createMutation(LogoutDocument);

  async function handleLogout() {
    try {
      await logout();
      setCurrentUser({ loggedIn: false });
      navigate('/');
    } catch (err) {
      console.error();
    }
  }

  return (
    <header className="container flex flex-r-w mx-auto text-sm mb-10 py-10 items-center">
      <p className="mr-20">
        <NavLink href={currentUser.loggedIn ? '/dashboard' : '/'} className="text-black" end>
          <Wordmark />
        </NavLink>
      </p>

      {!currentUser.loggedIn && (
        <nav className="flex w-full items-center">
          <NavLink href="/" className="text-black" activeClass="underline" end>
            Home
          </NavLink>

          <div className="flex ml-auto space-x-10">
            <NavLink href="/login" className="text-black" activeClass="nunderline">
              Login
            </NavLink>
            <NavLink href="/signup" className="text-black" activeClass="nunderline">
              Sign Up
            </NavLink>
          </div>
        </nav>
      )}

      {currentUser.loggedIn && (
        <nav className="flex w-full items-center">
          <div className="space-x-10">
            <NavLink href="/dashboard" className="text-black" activeClass="underline" end>
              Messages
            </NavLink>
            <NavLink href="/theme" className="text-black" activeClass="underline" end>
              Theme
            </NavLink>
            <NavLink href="/billing" className="text-black" activeClass="underline" end>
              Billing
            </NavLink>
          </div>

          <div className="flex  ml-auto space-x-10 text-sm">
            <NavLink href="/messages/new" className="text-black" activeClass="nunderline">
              New Msg
            </NavLink>

            <button aria-label="Logout" onClick={handleLogout}>
              <IconLeave />
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};
