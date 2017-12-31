import SvgIcon from 'material-ui/SvgIcon';
(global as any).__MUI_SvgIcon__ = SvgIcon;

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './app/App';

import './index.css';


const container = document.getElementById('root');

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    container
  );
}

render(App);

if (module.hot) {
  module.hot.accept('./app/App', () => {
    const NextApp = require('./app/App').default;
    render(
      NextApp
    );
  });
}