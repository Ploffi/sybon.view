import * as React from 'react';
import { MuiThemeProvider, darkBaseTheme, getMuiTheme } from 'material-ui/styles';
import Tabs from 'material-ui/Tabs';
import Tab from 'material-ui/Tabs/Tab';
import CollectionWrapper from './../Collections/CollectionWrapper';
import Paper from 'material-ui/Paper';

const muiTheme = getMuiTheme({
  fontFamily: 'Segoe UI',
  palette: {
    primary1Color: '#424242',
    primary2Color: '#1b1b1b',
    accent1Color: '#a5d6a7',
    textColor: '#000',
    alternateTextColor: '#b2ebf2',
    secondaryTextColor: '#000000',
  },
});

const App = (props) => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Tabs>
      <Tab label='Коллекции' value='a'>
        <Paper zDepth={2}>
          <CollectionWrapper />
        </Paper>
        
      </Tab>
      <Tab label='Задачи' value='b'>
        <div>
          Задачи
        </div>
      </Tab>
    </Tabs>
  </MuiThemeProvider>
);

export default App;