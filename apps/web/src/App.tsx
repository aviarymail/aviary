import { Component } from 'solid-js';
import Email from '@aviarymail/email-primitives';

import logo from './logo.svg';

const App: Component = () => {
  return (
    <Email.BrowserEmail>
      <Email.Row>
        <Email.Column>
          <Email.Image src={logo} class="w-10 h-10" alt="logo" />
          <Email.Text class="text-2xl">
            Edit <code>src/App.tsx</code> and save to reload.
          </Email.Text>
          <Email.A class="text-blue-500" href="https://github.com/solidjs/solid">
            Learn Solid
          </Email.A>
        </Email.Column>

        <Email.Column>
          <Email.Text>asdf</Email.Text>
        </Email.Column>

        <p>asd</p>
      </Email.Row>
    </Email.BrowserEmail>
  );
};

export default App;
