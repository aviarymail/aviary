import { children, Component, ComponentProps, createEffect, JSX } from 'solid-js';

interface Props extends ComponentProps<'table'> {}

export const Row: Component<Props> = props => {
  validateChildren(props.children);

  return (
    <table {...props}>
      <tbody>
        <tr>{props.children}</tr>
      </tbody>
    </table>
  );
};

function validateChildren(childrenProp: JSX.Element | Array<JSX.Element>) {
  const getChildren = children(() => childrenProp);

  createEffect(() => {
    let childList = getChildren();
    childList = [childList].flat();

    let err = false;
    for (const child of childList) {
      const { tagName } = child as HTMLTableRowElement;

      if (tagName !== 'TD') {
        err = true;
      }
    }

    if (err) {
      console.warn(`<Row /> only accepts <Column /> as its children.`);
    }
  });
}
