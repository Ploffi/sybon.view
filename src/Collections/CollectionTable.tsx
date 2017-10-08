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
import { ICollection, ISelectableCollection } from '../typings';

interface ICollectionTableProps {
    collections: ISelectableCollection[];
    onRowSelection: (rows: number[]) => void;
}

const CollectionTable = (props: ICollectionTableProps) => (
    <Table
        fixedHeader={true}
        selectable={true}
        onRowSelection={props.onRowSelection}
    >
        <TableHeader
            displaySelectAll={true}
            enableSelectAll={true}
        >
            <TableRow>
                <TableHeaderColumn colSpan={3} tooltip='Super Header' style={{ textAlign: 'center' }}>
                    Super Puper Header
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
                props.collections &&
                props.collections.map((collection, index) => (
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

export default CollectionTable;

