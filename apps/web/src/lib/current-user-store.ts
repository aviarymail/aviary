import { createStore } from 'solid-js/store';

export const [currentUser, setCurrentUser] = createStore({
  loggedIn: false,
  id: '',
  firstName: '',
  lastName: '',
});
