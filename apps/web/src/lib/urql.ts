import { createClient } from 'solid-urql';

export const urql = createClient({
  url: 'http://localhost:8080/graphql',
});
