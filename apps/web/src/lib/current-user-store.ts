import { createStore } from 'solid-js/store';
import { UserRoles } from '~/gql.types';

interface CurrentUserStore {
  loggedIn: boolean;
  id: string;
  firstName: string;
  lastName: string;
  role: UserRoles;
}

export const [currentUser, setCurrentUser] = createStore<CurrentUserStore>({
  loggedIn: false,
  id: '',
  firstName: '',
  lastName: '',
  role: UserRoles.User,
});
