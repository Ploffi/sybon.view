import * as React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { ICollection } from '../typings';


interface ICreateCollectionState {
    name: string;
    description: string;
    internalProblemId: string;
    internalProblemAddingResultText: string;
}

interface ICreateCollectionProps {
    onCreate: (collection: ICollection) => void;
    onAddProblem: (collection: ICollection, internaProblemId: string) => Promise<any>;
    onClose: () => void;
    isOpen: boolean;
    collection: ICollection;
}

export default class CreateCollection extends React.Component<ICreateCollectionProps, ICreateCollectionState> {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            internalProblemId: '',
            internalProblemAddingResultText: null,
        };
    }

    onNameChanged = (_, name) => this.setState({ name: name });
    onDescriptionChanged = (_, description) => this.setState({ description: description });
    handleCreateButtonClick = () => {
        this.props.onCreate({
            Id: guid(),
            ...this.props.collection,
            Name: this.state.name,
            Description: this.state.description,
        } as ICollection);
    }

    handleAddProblem = () => {
        this.props.onAddProblem(
            this.props.collection,
            this.state.internalProblemId,
        );
    }

    componentWillReceiveProps(nextProps: ICreateCollectionProps) {
        let newState = nextProps.collection
            ? {
                name: nextProps.collection.Name,
                description: nextProps.collection.Description,
            }
            : {
                name: '',
                description: '',
            };
        this.setState(newState);
    }

    render() {
        const actionName = this.props.collection ? 'Изменить' : 'Создать';
        const actions = [
            <FlatButton
                label={actionName}
                onClick={this.handleCreateButtonClick} />,
        ];
        return (
            <Dialog title={actionName} open={this.props.isOpen}
                actions={actions}
                onRequestClose={this.props.onClose} >
                <div>
                    <TextField
                        name='name'
                        value={this.state.name}
                        onChange={this.onNameChanged}
                        hintText={this.state.name ? null : 'Имя коллекции'} />
                </div>

                <div>
                    <TextField
                        name='describe'
                        value={this.state.description}
                        onChange={this.onDescriptionChanged}
                        multiLine={true}
                        fullWidth
                        rowsMax={4}
                        hintText={this.state.description ? null : 'Описание коллекции'} />
                </div>
                {
                    this.props.collection
                    &&
                    <div>
                        <TextField
                            name='adding'
                            value={this.state.internalProblemId}
                            errorText={this.state.internalProblemAddingResultText}
                            errorStyle={{color: '#0f0'}}
                            onChange={this.onNameChanged}
                            hintText={this.state.name ? null : 'Internal id задачи'} />

                        <FlatButton
                            label={'Добавить задачу1'}
                            onClick={this.handleCreateButtonClick} />
                    </div>
                }
            </Dialog>
        );
    }
}

//todo: remove
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}