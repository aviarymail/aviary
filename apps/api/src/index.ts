import { renderEmail } from '@aviarymail/email-renderer';
import { Config } from './lib/config';
import { createServer } from './server';

renderEmail();

try {
  createServer().listen(Config.PORT, '0.0.0.0', err => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    console.log(`Listening at http://0.0.0.0:3000/graphql`);
  });
} catch (err) {
  console.error('Failed to start graphql node.', err);
}
