import { command } from 'cleye';
import fetch from 'node-fetch';
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
      const { result: config } = await task(
        'Parsing configuration',
        async ({ setTitle, setStatus }) => {
          return {};
        }
      );

      const { result: projects } = await task(
        'Fetching projects',
        async ({ setTitle, setStatus }) => {
          return fetch('http://localhost:4000/api/introspection').then(res => res.json());
        }
      );

      await task('Building project interfaces', async ({ setTitle, setStatus }) => {
        console.log(projects);
        await new Promise(res => setTimeout(res, 2000));
      });

      await task('Cleaning up', async ({ setTitle, setStatus }) => {
        await new Promise(res => setTimeout(res, 2000));
      });
    });
  }
);
