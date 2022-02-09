import { createQuery } from 'solid-urql';
import { MeDocument } from '~/graphql.generated';

export default function NewMessagePage() {
  const [data] = createQuery({ query: MeDocument });

  return <main className="container mx-auto"></main>;
}
