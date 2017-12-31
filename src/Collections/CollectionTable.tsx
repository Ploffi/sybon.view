import * as React from 'react';
import Table from 'material-ui/Table';
import TableRow from 'material-ui/Table/TableRow';
import TableCell from 'material-ui/Table/TableCell';
import TableBody from 'material-ui/Table/TableBody';
import TableHead from 'material-ui/Table/TableHead';
import TextField from 'material-ui/TextField';
import { ICollection } from '../typings';

interface ICollectionTableProps {
    collections: ICollection[];
    onRowSelection: (id: ICollection['id']) => void;
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
        let filter = (this.state.filter || '').toLowerCase();
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={3} style={{ textAlign: 'center' }}>
                            <TextField onChange={this.handleFilterChange} placeholder='Фильтр по имени' />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell> Name </TableCell>
                        <TableCell> ProblemsCount </TableCell>
                        <TableCell> Description </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody style={{ cursor: 'pointer' }}>
                    {
                        this.props.collections &&
                        this.props.collections.filter(сollection => сollection.name.toLowerCase().startsWith(filter))
                            .map((collection, index) => (
                                <TableRow
                                    onClick={() => this.props.onRowSelection(collection.id)}
                                    hover={true}
                                    selected={collection.isSelected} key={index}>
                                    <TableCell>{collection.name}</TableCell>
                                    <TableCell>{collection.problemsCount}</TableCell>
                                    <TableCell>{collection.description}</TableCell>
                                </TableRow>
                            ))
                    }
                </TableBody>
            </Table>
        );
    }
}
