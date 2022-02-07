import { createSignal } from 'solid-js';
// import { MessageListFieldsFragment, MessageStatuses } from '~/graphql.generated';

// const exampleMessages: MessageListFieldsFragment[] = [
//   {
//     __typename: 'Message',
//     description: 'Maecenas sed diam eget risus varius blandit sit amet non magna.',
//     id: '1',
//     name: 'Welcome',
//     sent: 123,
//     status: MessageStatuses.Active,
//     category: 'Onboarding',
//   },
//   {
//     __typename: 'Message',
//     description: 'Nullam quis risus eget urna mollis ornare vel eu leo.',
//     id: '3',
//     name: 'Passwordless Login',
//     sent: 0,
//     status: MessageStatuses.Inactive,
//     category: 'Authentication',
//   },
//   {
//     __typename: 'Message',
//     description: 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.',
//     id: '2',
//     name: '2FA',
//     sent: 4123,
//     status: MessageStatuses.Error,
//     category: 'Authentication',
//   },
//   {
//     __typename: 'Message',
//     description: 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.',
//     id: '4',
//     name: 'New Subscription',
//     sent: 895,
//     status: MessageStatuses.Warning,
//     category: 'SaaS',
//   },
// ];

export default function Dashboard() {
  const [displayList, setDisplayList] = createSignal(true);

  return (
    <main className="container space- mx-auto">
      <div className="space-x-5 text-right">
        <button onClick={() => setDisplayList(false)} classList={{ underline: !displayList() }}>
          Card
        </button>
        <button onClick={() => setDisplayList(true)} classList={{ underline: displayList() }}>
          List
        </button>
      </div>

      {/* <MessageList messages={exampleMessages} displayList={displayList()} /> */}
    </main>
  );
}
