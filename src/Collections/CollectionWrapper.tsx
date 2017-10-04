import * as React from 'react';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

const mockData = require('./mockData.json');


const styles = {
  propContainer: {
    width: '200px',
    overflow: 'hidden' as 'hidden',
    margin: '20px auto 0',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
};


/**
 * A more complex example, allowing the table height to be set, and key boolean properties to be toggled.
 */
export default class TableExampleComplex extends React.Component {
  state = {
    fixedHeader: true,
    fixedFooter: true,
    stripedRows: false,
    showRowHover: false,
    selectable: true,
    multiSelectable: false,
    enableSelectAll: false,
    deselectOnClickaway: true,
    showCheckboxes: true,
    height: '300px',
  };

  handleToggle = (event, toggled) => {
    this.setState({
      [event.target.name]: toggled,
    });
  }

  handleChange = (event) => {
    this.setState({height: event.target.value});
  }

  render() {
    return (
      <div>
        <Table
          fixedHeader={true}
          selectable={true}
          multiSelectable={true}
          onRowSelection={(type) => console.log(type)}
        >
          <TableHeader
            displaySelectAll={true}
            enableSelectAll={true}
          >
            <TableRow>
              <TableHeaderColumn colSpan={3} tooltip='Super Header' style={{textAlign: 'center'}}>
                Super Header
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn tooltip='The ID'>ID</TableHeaderColumn>
              <TableHeaderColumn tooltip='The Name'>Name</TableHeaderColumn>
              <TableHeaderColumn tooltip='The Status'>Status</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={true}
            deselectOnClickaway={false}
            showRowHover={true}
          >
            {mockData.collections.map( (row, index) => (
              <TableRow key={row.id}>
                <TableRowColumn>{row.id}</TableRowColumn>
                <TableRowColumn>{row.name}</TableRowColumn>
                <TableRowColumn>{row.status}</TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}