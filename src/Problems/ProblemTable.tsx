import * as React from 'react';
import Table, {
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
} from 'material-ui-next/Table';
import TextField from 'material-ui-next/TextField';
import { IProblem } from '../typings';

interface IProblemTableProps {
    problems: IProblem[];
    onRowSelection: (selectedId: IProblem['Id']) => void;
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
                        <TableCell> Memory Limit (bytes) </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody style={{cursor: 'pointer'}} >
                    {
                        this.props.problems &&
                        this.props.problems.filter(c => c.Name.toLowerCase().startsWith(this.state.filter.toLowerCase())).map((problem, index) => (
                            <TableRow 
                             onClick={() => this.props.onRowSelection(problem.Id)}
                             selected={problem.isSelected} key={problem.Id}>
                                <TableCell>{problem.Name}</TableCell>
                                <TableCell>
                                    <a href={problem.StatementUrl}>
                                        {problem.StatementUrl ? 'Условие задачи' : ''}
                                    </a>
                                </TableCell>
                                <TableCell>{problem.TestsCount}</TableCell>
                                <TableCell>{problem.PretestsCount}</TableCell>
                                <TableCell>{problem.InternalProblemId}</TableCell>
                                <TableCell>{problem.ResourceLimits.TimeLimitMillis}</TableCell>
                                <TableCell>{problem.ResourceLimits.MemoryLimitBytes}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        );
    }
}
