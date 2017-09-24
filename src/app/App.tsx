import * as React from 'react';
import {MuiThemeProvider, darkBaseTheme, getMuiTheme} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';

const Main = (props) => (
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <AppBar title='My AppBar' />
  </MuiThemeProvider>
);

export default Main;