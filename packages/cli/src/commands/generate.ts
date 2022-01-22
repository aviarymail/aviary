import { command } from 'cleye';
import task from 'tasuku';

export const generate = command(
  {
    name: 'generate',
    alias: 'g',
    flags: {
      config: String,
    },
  },
  async argv => {
    await task('Building @aviarymail/client', async ({ task }) => {
      const asd = await task('Parsing configuration', async ({ setTitle, setStatus }) => {
        await new Promise(res => setTimeout(res, 2000));
      });

      await task('Fetching projects', async ({ setTitle, setStatus }) => {
        await new Promise(res => setTimeout(res, 2000));
      });

      await task('Building project interfaces', async ({ setTitle, setStatus }) => {
        await new Promise(res => setTimeout(res, 2000));
      });

      await task('Cleaning up', async ({ setTitle, setStatus }) => {
        await new Promise(res => setTimeout(res, 2000));
      });
    });
  }
);
