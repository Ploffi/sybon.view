import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app/App';

import './index.css';
import { AppContainer } from 'react-hot-loader';


const rootEl = document.getElementById('root') as HTMLElement;

function startUp(Component) {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    rootEl
  );
}

startUp(App);

if (module.hot) {
  module.hot.accept('./app/App', () => {
    startUp(App);
  });
}