import { children, Component, createSignal, UnoDirectiveValue } from 'solid-js';
import { generateCss } from '../uno';

export const ServerEmail: Component = props => {
  const c = children(() => props.children);
  const [css, setCss] = createSignal('');

  async function uno(el: HTMLElement, value: () => UnoDirectiveValue) {
    if (typeof window === 'undefined') return;

    const [children, setCss] = value();

    if (children.innerHTML) {
      const css = await generateCss(children.innerHTML);
      setCss(css);
    }
  }

  return (
    <div id="aviarymail-container" use:uno={[c(), setCss]}>
      <style
        type="text/css"
        innerHTML={`
          /* Force Outlook to provide a "view in browser" message */
          #outlook a { padding: 0; }

          /* Force Hotmail to display emails at full width */
          .ReadMsgBody { width: 100%; }

          /* Force Hotmail to display normal line spacing */
          .ExternalClass { width: 100%; }
          .ExternalClass,
          .ExternalClass p,
          .ExternalClass span,
          .ExternalClass font,
          .ExternalClass td,
          .ExternalClass div { line-height: 100%; }

          /* Prevent WebKit and Windows mobile changing default text sizes */
          body, table, td, p, a, li, blockquote { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }

          /* Remove spacing between tables in Outlook 2007 and up */
          table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }

          /* Allow smoother rendering of resized image in Internet Explorer */
          img { -ms-interpolation-mode: bicubic; }

          /* Reset */
          body{ margin: 0; padding: 0; }
          img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
          table { border-collapse: collapse !important; }
          body, #bodyTable, #bodyCell { height: 100% !important; margin: 0; padding: 0; width: 100% !important; }

          ${css}
        `}
      />
      {c()}
    </div>
  );
};
