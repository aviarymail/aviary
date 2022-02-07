import { groupBy } from 'lodash';
import { Component, createMemo, For } from 'solid-js';
import { MessageListItem } from './message-list-item';

// export const MESSAGE_LIST_FIELDS = gql`
//   fragment MessageListFields on Message {
//     id
//     ...MessageListItemFields
//   }

//   ${MESSAGE_LIST_ITEM_FIELDS}
// `;
interface Props {
  displayList: boolean;
  messages: any[];
}

export const MessageList: Component<Props> = props => {
  const grouped = createMemo(() => {
    const messages = groupBy(props.messages, 'category');
    const keys = Object.keys(messages).sort((a, b) => a.localeCompare(b));
    return { messages, keys };
  });

  return (
    <div className="space-y-12">
      <For each={grouped().keys}>
        {category => {
          const messages = grouped().messages[category];

          return (
            <section>
              <h2 className="font-bold mb-5">{category}</h2>

              <ul
                classList={{
                  'space-y-4': props.displayList,
                  'grid grid-cols-4 gap-5': !props.displayList,
                }}
              >
                <For each={messages}>
                  {message => {
                    return (
                      <li>
                        <MessageListItem displayList={props.displayList} item={message} />
                      </li>
                    );
                  }}
                </For>
              </ul>
            </section>
          );
        }}
      </For>
    </div>
  );
};
