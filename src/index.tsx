import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app/App';

import './index.css';
import { AppContainer } from 'react-hot-loader';


const rootEl = document.getElementById('root') as HTMLElement;

function startUp() {
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    rootEl
  );
}

startUp();

if (module.hot) {
  module.hot.accept('./app/App', () => {
    const NextApp = require('./app/App').default;
    startUp();
  });
}