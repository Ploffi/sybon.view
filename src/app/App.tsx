import * as React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Tabs from 'material-ui/Tabs';
import Tab from 'material-ui/Tabs/Tab';
import CollectionController from './../Collections/CollectionController';
import FullWidthTabs from './FullWidthTabs';
import AppBar from 'material-ui/AppBar';

import blueGrey from 'material-ui/colors/blueGrey';
import amber from 'material-ui/colors/amber';
import red from 'material-ui/colors/red';
import grey from 'material-ui/colors/grey';

const muiTheme = createMuiTheme({
  typography: {
    fontFamily: 'Segoe UI',
  },
  palette: {
    primary: blueGrey,
    secondary: amber,
    error: red,
    grey: grey,
  },
  overrides: {
    MuiTableRow: {
      selected: {
        background: '#e4e4e4',
      },
    },
  },
});

const labels = ['Коллекции', 'Задачи'];

class App extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0,
    };
  }

  handleTabChange = (value) => {
    this.setState({ selectedTab: value });
  }

  render() {
    return (
      <MuiThemeProvider theme={muiTheme}>
        <div>
          <AppBar position='static' color='primary'>
            <FullWidthTabs labels={labels} onTabChange={this.handleTabChange} />
          </AppBar>

          {this.state.selectedTab === 0 && <CollectionController />}
          {this.state.selectedTab === 1 && 'Задачи'}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;