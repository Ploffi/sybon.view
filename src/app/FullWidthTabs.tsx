import * as  React from 'react';
import {withStyles} from 'material-ui-next/styles';
import Tabs, { Tab } from 'material-ui-next/Tabs';

const styles = theme => ({
  root: {
    maxWidth: '100%',
  },
});

class CustomTabs extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  handleChange = (event, value) => this.setState({ value }) || this.props.onTabChange(value);
  

  render() {
    const {value} = this.state;
    return (
      <div style={{ width: '100%' }}>
          <Tabs
            value={value}
            onChange={this.handleChange}
            fullWidth
          >
            {
              this.props.labels && 
              this.props.labels.map((label, i) => (
                <Tab classes={this.props.classes} key={i} label={label} value={i}></Tab>
              ))
            }
          </Tabs>
      </div>
    );
  }
}

const FullWidthTabs = withStyles(styles)(CustomTabs);

export default FullWidthTabs;