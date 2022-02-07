import { Component } from 'solid-js';
// import { MessageStatuses } from '~/graphql.generated';

// export const MESSAGE_LIST_ITEM_FIELDS = gql`
//   fragment MessageListItemFields on Message {
//     id
//     status
//     name
//     description
//     sent
//     category
//   }
// `;

interface Props {
  displayList: boolean;
  item: any;
}

export const MessageListItem: Component<Props> = props => {
  return null;

  // return (
  //   <div
  //     classList={{
  //       'border rounded-lg shadow shadow-gray-100 p-5': true,
  //       'border-green-100': props.item.status === MessageStatuses.Active,
  //       'border-gray-100': props.item.status === MessageStatuses.Inactive,
  //       'border-yellow-200': props.item.status === MessageStatuses.Warning,
  //       'border-orange-200': props.item.status === MessageStatuses.Error,
  //       'grid grid-cols-3 items-center': props.displayList,
  //       'h-full flex flex-col': !props.displayList,
  //     }}
  //   >
  //     <h3 classList={{ 'mb-3': !props.displayList }}>{props.item.name}</h3>
  //     <p className="text-sm truncate" classList={{ 'mb-6': !props.displayList }}>
  //       {props.item.description}
  //     </p>

  //     <div className="text-right" classList={{ 'mt-auto': !props.displayList }}>
  //       <Status status={props.item.status} sent={props.item.sent} />
  //     </div>
  //   </div>
  // );
};

// const Status: Component<{ status: MessageStatuses; sent: number }> = props => {
//   if (props.status === MessageStatuses.Active) {
//     return <p className="text-xs uppercase">{props.sent} Sent</p>;
//   }

//   if (props.status === MessageStatuses.Inactive) {
//     return <p className="text-xs opacity-50 uppercase">Inactive</p>;
//   }

//   if (props.status === MessageStatuses.Warning) {
//     return <p className="text-xs text-yellow-600 uppercase">Warning</p>;
//   }

//   return <p className="text-xs text-red-600 uppercase">Error</p>;
// };
