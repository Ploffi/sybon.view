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
import { ICollection, ISelectableCollection } from '../typings';

interface ICollectionTableProps {
    collections: ISelectableCollection[];
    onRowSelection: (rows: number[]) => void;
}

interface ICollectionTableState {
    filter: string;
}

export default class CollectionTable extends React.Component<ICollectionTableProps, ICollectionTableState> {

    constructor(props) {
        super(props);
        this.state = {
            filter: '',
        };
    }

    handleFilterChange = (_, f) => this.setState({ filter: f });

    render() {
        let filter = this.state.filter || '';
        return (
            <Table
                fixedHeader={true}
                selectable={true}
                onRowSelection={this.props.onRowSelection}
            >
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn colSpan={3} tooltip='Фильтр по имени коллекции' style={{ textAlign: 'center' }}>
                            <TextField onChange={this.handleFilterChange} hintText={filter === '' ? 'Имя коллекции' : ''} />
                        </TableHeaderColumn>
                    </TableRow>
                    <TableRow>
                        <TableHeaderColumn> Name </TableHeaderColumn>
                        <TableHeaderColumn> ProblemsCount </TableHeaderColumn>
                        <TableHeaderColumn> Description </TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody
                    displayRowCheckbox={true}
                    deselectOnClickaway={false}
                    showRowHover={false}
                >
                    {
                        this.props.collections &&
                        this.props.collections.filter(c => c.Name.toLowerCase().startsWith(this.state.filter.toLowerCase())).map((collection, index) => (
                            <TableRow selected={collection.isSelected} key={index}>
                                <TableRowColumn>{collection.Name}</TableRowColumn>
                                <TableRowColumn>{collection.ProblemCount}</TableRowColumn>
                                <TableRowColumn>{collection.Description}</TableRowColumn>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        );
    }
}
