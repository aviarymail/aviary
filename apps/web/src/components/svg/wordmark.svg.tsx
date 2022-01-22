import { Component, ComponentProps } from 'solid-js';

interface Props extends ComponentProps<'svg'> {}

export const Wordmark: Component<Props> = props => {
  return (
    <svg width="166" height="68" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M45 0c-1.333.667-5 2.2-9 3l-.007.015c-13.767.448-25.906 11.12-28.104 24.82-.809 2.692-3.413 5.054-5.41 6.866-1.95 1.768-3.322 3.012-1.88 3.528 2.625-.967 7.258 1.292 9.663 4.262.204.311.42.612.646.903.05.082.1.164.146.246l.043-.008c3.02 3.718 7.798 5.688 13.717 5.688 3.84 0 12.16-.88 12.32-6.4l-.08-.56c-.08-.24-.16-.32-.32-.32-.08 0-.16 0-.4.16-2.48 2.48-6.16 3.28-9.6 3.28-5.952 0-10.599-2.087-12.95-6.287-1.261-1.775-4.496-3.091-7.73-3.553.206-.154.423-.309.648-.47 1.96-1.397 4.558-3.25 6.352-9.53l.014.038C16.146 15.58 26.085 6.6 36.574 6.6c6 0 9.44 3.2 9.44 9.28 0 5.36-5.12 19.28-10.8 19.28-1.28 0-1.52-1.12-1.52-2.16 0-2.973 1.703-6.866 3.258-10.423.496-1.133.976-2.232 1.382-3.257.32-.96-.08-1.6-1.12-1.68h-.64c-.56 0-1.04-.24-1.28-.72a2.79 2.79 0 0 0-2.4-1.36c-10.64 0-20 22.32-9.2 22.32 1.92 0 3.76-1.12 5.36-2.72l.24-.32c.16-.16.32-.24.48-.24.32 0 .64.24.72.56.48 1.92 1.84 2.88 4.32 2.88 9.68 0 15.6-14 15.6-22.56 0-4.271-1.147-7.32-3.29-9.336A1.155 1.155 0 0 0 47 6c-1-1-2-2-1-4-1.2.8-2.5 1-3 1l2-3ZM25.294 34.52c-.96 0-1.28-.96-1.28-1.84v-.96c.32-2.96 4.96-13.76 8.64-13.76.4 0 .72.32 1.04.72.4.72.48 1.68.16 2.4l-1.76 4.32c-.32.88-.64 1.76-.88 2.64-.8 2.32-3.36 6.48-5.92 6.48ZM79.49 29.6c-1.36 3.28-2.72 7.04-2.72 8.72 0 1.04.4 1.6 1.12 1.6 2.64 0 7.76-7.2 10-10.56a1.19 1.19 0 0 1 .069-.102c2.927-7.04 8.449-14.675 14.587-14.618 1.2 0 2.24.56 2.96 1.52.08.08.16.16.24.16.16 0 .16-.24.16-.24 0-.24.32-.48.64-.48h3.28c.96 0 1.44.64 1.12 1.52-.16.56-.32 1.04-.56 1.52-1.36 3.6-2.8 7.2-4.32 10.96-1.36 3.28-2.72 7.04-2.72 8.72 0 1.04.48 1.6 1.12 1.6 2.564 0 7.468-6.792 9.8-10.261 1.726-3.101 3.988-8.072 5.003-12.059.24-.64 0-1.44-.48-1.92-.32-.32-.48-.56-.64-.88-.72-2.96 1.04-3.84 3.92-3.84h.88c.48 0 .8.32.72.8 0 .72.32 1.52.96 1.92 1.84 1.533 3.46 1.67 6.056 1.89l.344.03h.48c.24 0 .48.16.56.4l.48 1.2c.24.56.24 1.36-.08 1.92l-.217.46c-2.677 5.676-7.223 15.314-7.223 18.74 0 1.04.4 1.6 1.12 1.6 2.61 0 7.644-7.038 9.923-10.445.606-1.323 1.25-2.652 1.879-3.95v-.002h.001c1.502-3.101 2.917-6.021 3.512-8.243l.24-.8c.08-.48.48-.8.96-.8h1.92c1.6 0 2.32 1.04 1.68 2.48-.379.819-.829 1.768-1.319 2.803-2.719 5.74-6.681 14.104-6.681 17.357-.08 1.04.24 1.6 1.12 1.68 2.72-.24 9.44-9.2 10.88-12.4l.32-.72c1.36-3.6 2.4-6.64 3.04-8.8.32-1.12 1.28-1.92 2.48-1.92h.72c1.6 0 2.4 1.04 1.84 2.56-1.6 4.56-4.24 11.44-7.44 18.56l-2.16 4.64c-.16.24.08.56.4.56 0 0 .08-.08.16-.08 4.48-3.36 8.64-7.76 11.52-12.4.24-.4.64-.64 1.12-.64.16 0 .4.08.64.16.64.32.8.96.48 1.68-3.52 6.4-9.2 11.52-15.36 15.52-1.36.88-2.4 2.08-3.2 3.44-3.76 6.88-10.4 17.44-17.2 17.44-3.44 0-6.64-2.4-6.64-6.16 0-5.428 8.072-8.717 13.684-11.005 1.254-.51 2.385-.971 3.276-1.395.72-.32 1.44-.64 2.16-1.04 1.04-.48 1.84-1.36 2.4-2.32.72-1.44 1.44-2.88 2.08-4.32.08-.32-.08-.56-.32-.56-.16 0-.24.08-.32.16-1.84 1.76-4.16 3.28-6.64 3.28-2.64 0-4.16-2-4.24-4.88 0-.315.018-.64.052-.974-2.561 3.226-5.618 5.854-9.047 5.854-2.56 0-4.16-2.08-4.16-4.88 0-4.032 2.94-10.004 5.446-15.094.328-.666.648-1.316.954-1.946.64-1.36 1.04-2.56 1.36-3.68-1.36-.08-2.8-.32-4.08-.64-.72 0-1.2.16-1.52.8-.961 2.756-3.925 9.772-5.929 12.455-3.067 5.225-7.861 12.985-13.754 12.985-2.16 0-3.52-1.44-4-3.36-.08-.24-.24-.4-.48-.4-.16 0-.32.08-.4.16-2.08 2.16-4.64 3.6-7.2 3.6-3.794 0-4.815-3.523-4.514-7.086-2.74 3.762-6.125 7.086-9.982 7.086-2.56 0-4.16-2.08-4.16-4.88 0-2.96 2-7.52 3.84-11.44 1.52-3.44 2.72-6.88 3.6-10.64l.16-.88c.08-.48.48-.8 1.04-.8h2.96c.96 0 1.44.64 1.12 1.52-.16.56-.32 1.04-.56 1.52-1.36 3.6-2.8 7.2-4.32 10.96Zm21.136 1.52c-1.36 2.88-4.72 8.72-8.08 8.72-1.84 0-1.76-2.16-1.68-3.68.32-4.08 6.56-18.4 11.28-18.4 1.2 0 1.84 1.52 2.16 2.8.08.72.08 1.44-.24 2.16-.56 1.76-1.2 3.52-2 5.2l-1.44 3.2Zm25.718 29.36c0-2.711 5.469-5.11 8.884-6.608.817-.358 1.517-.665 1.996-.912l.48-.24c.08-.08.16-.08.24-.08.32 0 .48.4.32.64-2.16 3.6-6.08 9.36-9.36 9.36-1.44 0-2.48-.64-2.56-2.16Z"
        fill="currentColor"
      />
      <path
        d="M80.77 10c.88-1.44 1.92-2.48 3.04-2.48.32 0 .64.08.96.24 1.68.72 1.76 2.56.88 4.24-.56 1.2-1.68 2.32-2.96 2.32-.32 0-.64 0-.96-.16-1.52-.64-1.6-2.48-.96-4.16ZM59.88 42.32c-.32.96-1.04 1.68-2.08 1.68H57c-.56 0-1.28-.24-1.6-.72-3.177-4.144-1.763-10.612-.494-16.421.202-.92.399-1.824.574-2.699 0-.16-.08-.32-.16-.4-.16-.08-.32-.08-.4.08l-.4.8c-1.04 2.16-2.88 5.2-3.76 6.48-.24.4-.64.64-1.04.64-.24 0-.48-.08-.64-.16-.72-.32-.88-.96-.48-1.6l.064-.11c2.153-3.666 4.984-8.49 5.776-12.45.24-1.12 1.36-1.84 2.48-1.84h1.76c1.04 0 2 .64 2.16 1.76.602 4.102-.63 8.728-1.775 13.034-.53 1.991-1.041 3.915-1.345 5.686-.08.64-.16 1.28-.16 1.84 0 .24.16.48.4.48.08 0 .24-.08.32-.24 1.14-1.78 2.638-3.582 4.18-5.435 3.655-4.395 7.556-9.084 7.5-14.485 0-1.6.8-2.64 2.4-2.72h1.28c.88 0 1.76.48 1.84 1.36.662 4.066-4.041 9.78-8.511 15.212-3.093 3.759-6.075 7.381-7.089 10.228ZM166 26a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
        fill="currentColor"
      />
    </svg>
  );
};