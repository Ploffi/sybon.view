import SvgIcon from 'material-ui/SvgIcon';
(global as any).__MUI_SvgIcon__ = SvgIcon;


import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app/App';

import './index.css';


const rootEl = document.getElementById('root') as HTMLElement;

function startUp(Component) {
  ReactDOM.render(
      <Component />,
    rootEl
  );
}


startUp(App);