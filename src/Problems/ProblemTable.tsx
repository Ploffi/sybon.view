import * as React from 'react';
import Table from 'material-ui-next/Table';
import TableRow from 'material-ui-next/Table/TableRow';
import TableCell from 'material-ui-next/Table/TableCell';
import TableBody from 'material-ui-next/Table/TableBody';
import TableHead from 'material-ui-next/Table/TableHead';
import TextField from 'material-ui-next/TextField';
import { IProblem } from '../typings';
import { api_key } from '../WebApi';

interface IProblemTableProps {
    problems: IProblem[];
    onRowSelection: (selectedId: IProblem['id']) => void;
}

interface IProblemTableState {
    filter: string;
}

const toMB = (byte) => byte / (1024 * 1024) | 0;

export default class ProblemTable extends React.Component<IProblemTableProps, IProblemTableState> {
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
                        <TableCell colSpan={7} style={{ textAlign: 'center' }}>
                            <TextField onChange={this.handleFilterChange} placeholder='Имя задачи' />
                        </TableCell>
                    </TableRow>
                    <TableRow>
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
                        this.props.problems.filter(
                            c => c.name.toLowerCase().startsWith(this.state.filter.toLowerCase())
                        ).map((problem, index) => (
                            <TableRow
                                onClick={() => this.props.onRowSelection(problem.id)}
                                selected={problem.isSelected} key={problem.id}>
                                <TableCell>{problem.name}</TableCell>
                                <TableCell>
                                    <a href={problem.statementUrl} onClick={(e) => e.stopPropagation()} target='_blank'>
                                        {problem.statementUrl ? 'Условие задачи' : ''}
                                    </a>
                                </TableCell>
                                <TableCell>{problem.testsCount}</TableCell>
                                <TableCell>{problem.pretests.length}</TableCell>
                                <TableCell>{problem.internalProblemId}</TableCell>
                                <TableCell>{problem.resourceLimits.timeLimitMillis}</TableCell>
                                <TableCell>{toMB(problem.resourceLimits.memoryLimitBytes)}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        );
    }
}
