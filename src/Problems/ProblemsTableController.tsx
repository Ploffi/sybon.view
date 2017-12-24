import * as React from 'react';
import { ICollection, IProblem } from '../typings';
import WebApiClient from '../WebApi';
import ProblemTable from './../Problems/ProblemTable';

import { CircularProgress } from 'material-ui-next/Progress';
import Button from 'material-ui-next/Button';
import Toolbar from 'material-ui-next/Toolbar';
import Paper from 'material-ui-next/Paper';

interface IProblemsTableControllerProps {
    collection: ICollection;
}

interface IProblemsTableControllerState {
    loading: boolean;
    error: boolean;
    problems: IProblem[];
}


class ProblemsTableController extends React.Component<IProblemsTableControllerProps, IProblemsTableControllerState> {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: false,
            problems: [],
        };
    }

    handleProblemSelected = (selectedId) => {
        this.setState((prevState) => ({
            problems: prevState.problems.map(p => ({
                ...p,
                isSelected: p.isSelected ? p.id !== selectedId : p.id === selectedId,
            })),
        }));
    }

    handleRemoveProblemsFromCollection = () => {
        let deletedProblemsIds = this.state.problems.filter(p => p.isSelected).map(p => p.internalProblemId);
        this.setState({
            loading: true,
        });
        WebApiClient.Collections.RemoveProblemFromCollection(this.props.collection.id, deletedProblemsIds)
            .then(() => {
                this.setState((prevState: IProblemsTableControllerState) => ({
                    problems: prevState.problems.filter(p => !p.isSelected),
                    loading: false,
                }));
            })
            .catch(() => {
                this.setState({
                    loading: false,
                });
                alert('Не удалось удалить задачу');
            });
    }

    componentWillReceiveProps(nextProps: IProblemsTableControllerProps) {
        if (nextProps.collection) {
            this.setState({
                loading: true,
                error: false,
            });
            WebApiClient.Collections.GetCollectionById(nextProps.collection.id)
                .then(col => this.setState({ problems: col.problems, loading: false }))
                .catch(e => this.setState({ error: true, loading: false }));
        }
        else {
            this.setState({
                problems: [],
            });
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
                            raised
                            onClick={this.handleRemoveProblemsFromCollection}
                            disabled={selectedProblemsCount === 0}>
                            {`Удалить задач${selectedProblemsCount > 1 ? 'и' : 'у'} из коллекции`}
                        </Button>
                    </Toolbar>
                </Paper>
            </div>
        );
    }

}

export default ProblemsTableController;