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
import { IProblem } from '../typings';

interface IProblemTableProps {
    problems: IProblem[];
    onRowSelection: (rows: number[]) => void;
}

interface IProblemTableState {
    filter: string;
}

export default class ProblemTable extends React.Component<IProblemTableProps, IProblemTableState> {

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
                onRowSelection={this.props.onRowSelection}
            >
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn colSpan={7} tooltip='Фильтр по имени задачи' style={{ textAlign: 'center' }}>
                            <TextField onChange={this.handleFilterChange} hintText={filter === '' ? 'Имя задачи' : ''} />
                        </TableHeaderColumn>
                    </TableRow>
                    <TableRow>
                        <TableHeaderColumn> Name </TableHeaderColumn>
                        <TableHeaderColumn> Statement Url </TableHeaderColumn>
                        <TableHeaderColumn> Tests count </TableHeaderColumn>
                        <TableHeaderColumn> Pretests Count </TableHeaderColumn>
                        <TableHeaderColumn> Internal Problem Id </TableHeaderColumn>
                        <TableHeaderColumn> Time limit (ms) </TableHeaderColumn>
                        <TableHeaderColumn> Memory Limit (bytes) </TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody
                    deselectOnClickaway={false}
                >
                    {
                        this.props.problems &&
                        this.props.problems.filter(c => c.Name.toLowerCase().startsWith(this.state.filter.toLowerCase())).map((problem, index) => (
                            <TableRow selected={problem.isSelected} key={index}>
                                <TableRowColumn>{problem.Name}</TableRowColumn>
                                <TableRowColumn>
                                    <a href={problem.StatementUrl}>
                                        {problem.StatementUrl ? 'Условия' : ''}
                                    </a>
                                </TableRowColumn>
                                <TableRowColumn>{problem.TestsCount}</TableRowColumn>
                                <TableRowColumn>{problem.PretestsCount}</TableRowColumn>
                                <TableRowColumn>{problem.InternalProblemId}</TableRowColumn>
                                <TableRowColumn>{problem.ResourceLimits.TimeLimitMillis}</TableRowColumn>
                                <TableRowColumn>{problem.ResourceLimits.MemoryLimitBytes}</TableRowColumn>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        );
    }
}
