import React from 'react';
import { render } from 'react-dom';
import App from './containers/App/App';
import * as serviceWorker from './serviceWorker';

serviceWorker.register();

render(
  <App />,
  document.getElementById('root'),
);
