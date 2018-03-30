import { StyleRules, withStyles } from 'material-ui/styles';
import Table, { TableFooter, TablePagination } from 'material-ui/Table';
import TableBody from 'material-ui/Table/TableBody';
import TableCell from 'material-ui/Table/TableCell';
import TableHead from 'material-ui/Table/TableHead';
import TableRow from 'material-ui/Table/TableRow';
import TextField from 'material-ui/TextField';
import * as React from 'react';
import { ICollection, IProblem } from '../typings';


interface IProblemTableProps {
    problems: IProblem[];
    onRowSelection: (selectedId: IProblem['id']) => void;
}

interface IProblemTableState {
    nameFilter: string;
    internalIdFilter: string;
    currentPage: number;
    rowsPerPage: number;
}

const toMB = (byte) => byte / (1024 * 1024) | 0;

const styles: StyleRules = {
    'textFieldMargin': {
        marginRight: '10px',
    }
};

const defaultRowsPerpage = 7;
class ProblemTable extends React.Component<IProblemTableProps, IProblemTableState> {
    constructor(props) {
        super(props);
        this.state = {
            nameFilter: '',
            internalIdFilter: '',
            currentPage: 0,
            rowsPerPage: defaultRowsPerpage,
        };
    }

    handleNameFilterChange = (event) => this.setState({ nameFilter: event.target.value });
    handleIdFilterChange = (event) => this.setState({ internalIdFilter: event.target.value });
    handlePageChanged = (currentPage) => this.setState({ currentPage });
    handleChangeRowsPerPage = (event) => this.setState({ rowsPerPage: event.target.value });

    render() {
        const rowPerPage = this.state.rowsPerPage;
        const nameFilter = (this.state.nameFilter || '').toLowerCase(),
            idFilter = (this.state.internalIdFilter || '').toLowerCase();
        const filterFunc = (problem: IProblem) => problem.name.toLowerCase().startsWith(nameFilter)
            && problem.internalProblemId.toLowerCase().startsWith(idFilter);

        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={8} style={{ textAlign: 'center' }}>
                            <TextField className='marginRight' onChange={this.handleNameFilterChange} placeholder='Фильтр по имени' />
                            <TextField onChange={this.handleIdFilterChange} placeholder='Фильтр по internal id' />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell> Internal id </TableCell>
                        <TableCell> Name </TableCell>
                        <TableCell> Statement Url </TableCell>
                        <TableCell> Tests count </TableCell>
                        <TableCell> Pretests Count </TableCell>
                        <TableCell> Internal Problem Id </TableCell>
                        <TableCell> Time limit (ms) </TableCell>
                        <TableCell> Memory Limit (MB) </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody style={{ cursor: 'pointer' }} >
                    {
                        this.props.problems &&
                        this.props.problems.filter(filterFunc)
                            .slice(this.state.currentPage * rowPerPage, (this.state.currentPage + 1) * rowPerPage)
                            .map((problem: IProblem, index) => (
                                <TableRow
                                    onClick={() => this.props.onRowSelection(problem.internalProblemId)}
                                    selected={problem.isSelected} key={problem.id}>
                                    <TableCell>{problem.internalProblemId}</TableCell>
                                    <TableCell>{problem.name}</TableCell>
                                    <TableCell>
                                        <a href={problem.statementUrl} onClick={(e) => e.stopPropagation()} target='_blank'>
                                            {problem.statementUrl ? 'Условие задачи' : ''}
                                        </a>
                                    </TableCell>
                                    <TableCell>{problem.testsCount}</TableCell>
                                    <TableCell>{problem.pretests && problem.pretests.length}</TableCell>
                                    <TableCell>{problem.internalProblemId}</TableCell>
                                    <TableCell>{problem.resourceLimits && problem.resourceLimits.timeLimitMillis}</TableCell>
                                    <TableCell>{problem.resourceLimits && toMB(problem.resourceLimits.memoryLimitBytes)}</TableCell>
                                </TableRow>
                            ))
                    }
                </TableBody>
                <TableFooter>
                    {
                        this.props.problems && this.props.problems.length > defaultRowsPerpage &&
                        <TableRow>
                            <TablePagination
                                rowsPerPage={rowPerPage}
                                page={this.state.currentPage}
                                onChangePage={this.handlePageChanged}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                count={this.props.problems.length}
                                rowsPerPageOptions={[defaultRowsPerpage, 15, 25]}
                            />
                        </TableRow>}
                </TableFooter>
            </Table>
        );
    }
}

export default ProblemTable;