import * as React from 'react';
import Table, {
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
} from 'material-ui-next/Table';
import TextField from 'material-ui-next/TextField';
import { ICollection } from '../typings';

interface ICollectionTableProps {
    collections: ICollection[];
    onRowSelection: (id: ICollection['Id']) => void;
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

    handleFilterChange = (event) => this.setState({ filter: event.target.value });

    render() {
        let filter = this.state.filter || '';
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={3} style={{ textAlign: 'center' }}>
                            <TextField onChange={this.handleFilterChange} placeholder='Имя коллекции' />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell> Name </TableCell>
                        <TableCell> ProblemsCount </TableCell>
                        <TableCell> Description </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody style={{cursor: 'pointer'}}>
                    {
                        this.props.collections &&
                        this.props.collections.filter(c => c.Name.toLowerCase().startsWith(this.state.filter.toLowerCase())).map((collection, index) => (
                            <TableRow
                                onClick={() => this.props.onRowSelection(collection.Id)}
                                selected={collection.isSelected} key={index}>
                                <TableCell>{collection.Name}</TableCell>
                                <TableCell>{collection.ProblemCount}</TableCell>
                                <TableCell>{collection.Description}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        );
    }
}
