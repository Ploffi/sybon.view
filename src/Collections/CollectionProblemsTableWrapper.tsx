import * as React from 'react';
import { ICollection, IProblem } from '../typings';
import WebApiClient from '../WebApi';
import ProblemTable from './../Problems/ProblemTable';

import { CircularProgress } from 'material-ui-next/Progress';
import Button from 'material-ui-next/Button';
import Toolbar from 'material-ui-next/Toolbar';
import Paper from 'material-ui-next/Paper';

interface ICollectionProblemsTableWrapperProps {
    collection: ICollection;
}

interface ICollectionProblemsTableWrapperState {
    loading: boolean;
    error: boolean;
    problems: IProblem[];
}

export default class CollectionProblemsTableWrapper extends React.Component<ICollectionProblemsTableWrapperProps, ICollectionProblemsTableWrapperState> {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: false,
            problems: [],
        };
    }

    handleProblemSelected = (selectedId) => {
        this.setState((prevState: ICollectionProblemsTableWrapperState) => ({
            problems: prevState.problems.map(p => ({
                ...p,
                isSelected: p.Id === selectedId,
            })),
        }));
    }

    handleRemoveCollection = () => {
        this.setState((prevState: ICollectionProblemsTableWrapperState) => ({
            problems: prevState.problems.filter(p => p.isSelected),
        }));
    }

    componentWillReceiveProps(nextProps: ICollectionProblemsTableWrapperProps) {
        if (nextProps.collection) {
            this.setState({
                loading: true,
                error: false,
            });
            WebApiClient.Collections.GetCollection(nextProps.collection.Id)
                .then(col => this.setState({ problems: col.Problems, loading: false }))
                .catch(e => this.setState({ error: true, loading: false }));
        }
    }

    render() {
        let selectedProblemsCount = this.state.problems.filter(p => p.isSelected).length;
        return (
            <div className='tableWrapper'>
                {
                    this.state.loading &&
                    <div className='loaderWrapper'>
                        <CircularProgress color='accent' />
                    </div>
                }
                {
                    this.state.problems &&
                    <ProblemTable
                        problems={this.state.problems}
                        onRowSelection={this.handleProblemSelected} />
                }
                {
                    this.state.error && this.props.collection &&
                    <div style={{ textAlign: 'center', fontSize: 18, minHeight: 40 }}>
                        Не удалось загрузить задачи ;(
                    </div>
                }
                <Paper>
                    <Toolbar>
                        <Button
                            onClick={this.handleRemoveCollection}
                            disabled={selectedProblemsCount === 0}>
                            {`Удалить задач${selectedProblemsCount > 1 ? 'и' : 'у'} из коллекции`}
                    </Button>
                    </Toolbar>
                </Paper>
            </div>
        );
    }

}