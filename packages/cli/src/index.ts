import { cli } from 'cleye';
import { generate } from './commands/generate';

cli({
  name: 'aviarymail',
  version: '0.0.0',
  commands: [generate],
});
