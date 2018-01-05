import * as React from 'react';
import Table, {
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import { ICollection } from '../typings';
import Button from 'material-ui/Button';

interface ICollectionTableProps {
    collections: ICollection[];
    onRowSelection: (id: ICollection['id']) => void;
    onDelete: (id: ICollection['id']) => void;
}

interface ICollectionTableState {
    nameFilter: string;
    idFilter: string;
    currentPage: number;
    rowsPerPage: number;
}

const defaultRowsPerpage = 7;
export default class CollectionTable extends React.Component<ICollectionTableProps, ICollectionTableState> {

    constructor(props) {
        super(props);
        this.state = {
            nameFilter: '',
            idFilter: '',
            currentPage: 0,
            rowsPerPage: defaultRowsPerpage,
        };
    }

    handleNameFilterChange = (event) => this.setState({ nameFilter: event.target.value });
    handleIdFilterChange = (event) => this.setState({ idFilter: event.target.value });
    handlePageChanged = (event, currentPage) => {
        this.setState({ currentPage });
    }
    handleChangeRowsPerPage = (event) => this.setState({ rowsPerPage: event.target.value })

    render() {
        const rowPerPage = this.state.rowsPerPage;
        const nameFilter = (this.state.nameFilter || '').toLowerCase(),
            idFilter = (this.state.idFilter || '').toLowerCase();
        const filterFunc = (collection: ICollection) =>
            collection.name.toLowerCase().startsWith(nameFilter) &&
            String(collection.id).toLowerCase().startsWith(idFilter);
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={5} style={{ textAlign: 'center' }}>
                            <TextField className='marginRight' onChange={this.handleNameFilterChange} placeholder='Фильтр по имени' />
                            <TextField onChange={this.handleIdFilterChange} placeholder='Фильтр по id' />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell> Id </TableCell>
                        <TableCell> Name </TableCell>
                        <TableCell> ProblemsCount </TableCell>
                        <TableCell> Description </TableCell>
                        <TableCell> </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody style={{ cursor: 'pointer' }}>
                    {
                        this.props.collections &&
                        this.props.collections.filter(filterFunc)
                            .slice(this.state.currentPage * rowPerPage, (this.state.currentPage + 1) * rowPerPage)
                            .map((collection, index) => (
                                <TableRow
                                    onClick={() => this.props.onRowSelection(collection.id)}
                                    hover={true}
                                    selected={collection.isSelected} key={collection.id}>
                                    <TableCell>{collection.id}</TableCell>
                                    <TableCell>{collection.name}</TableCell>
                                    <TableCell>{collection.problemsCount}</TableCell>
                                    <TableCell>{collection.description}</TableCell>
                                    <TableCell>
                                        <Button
                                            color='primary'
                                            onClick={(e) => e.stopPropagation() || this.props.onDelete(collection.id)}>
                                            Удалить
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                    }
                </TableBody>
                <TableFooter>
                    {
                        this.props.collections && this.props.collections.length > defaultRowsPerpage &&
                        <TableRow>
                            <TablePagination
                                rowsPerPage={rowPerPage}
                                page={this.state.currentPage}
                                onChangePage={this.handlePageChanged}
                                count={this.props.collections.length}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                rowsPerPageOptions={[defaultRowsPerpage, 15, 25]}
                            />
                        </TableRow>
                    }

                </TableFooter>
            </Table>
        );
    }
}
