import { Component, createSignal, UnoDirectiveValue } from 'solid-js';
import { generateCss } from '../uno';
import { Row } from './Row';
import { Column } from './Column';

export const BrowserEmail: Component = props => {
  const [css, setCss] = createSignal('');

  async function uno(el: HTMLElement, value: () => UnoDirectiveValue) {
    if (typeof window === 'undefined') return;

    const [children, setCss] = value();

    const { innerHTML } = children as Element;

    if (innerHTML) {
      const css = await generateCss(innerHTML);
      setCss(css);
    }
  }

  return (
    <>
      <style
        type="text/css"
        innerHTML={`
          #aviarymail-container table {
            border-collapse: collapse !important;
          }

          #aviarymail-container img {
            display: block;
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
          }

          @media only screen and (max-width: 480px){
            #aviarymail-container img {
              height:auto !important;
              max-width:600px !important;
              width: 100% !important;
            }
          }
          ${css}
        `}
      />

      <Row id="aviarymail-container" class="w-full" use:uno={[props.children, setCss]}>
        <Column>
          <Row class="w-[600px]">
            <Column>{props.children}</Column>
          </Row>
        </Column>
      </Row>
    </>
  );
};
