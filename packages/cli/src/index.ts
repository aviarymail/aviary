import { cli, command } from 'cleye';
import task from 'tasuku';

cli({
  name: 'aviarymail',
  version: '0.0.0',
  commands: [
    command(
      {
        name: 'generate',
        alias: 'g',
        flags: {
          silent: Boolean,
        },
      },
      async argv => {
        await task('Fetching template schemas', async ({ setTitle, setStatus }) => {
          await new Promise(res => setTimeout(res, 2000));
        });
        await task('Building @aviarymail/client', async ({ setTitle, setStatus }) => {
          await new Promise(res => setTimeout(res, 2000));
        });
      }
    ),
  ],
});
