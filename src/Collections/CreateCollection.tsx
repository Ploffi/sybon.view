import * as React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { ICollection } from '../typings';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';


enum InternalProblemStatus {
    None,
    Success,
    Fail,
}

interface ICreateCollectionState {
    name: string;
    description: string;
    internalProblemId: string;
    internalProblemStatus: InternalProblemStatus;
}

interface ICreateCollectionProps {
    onCreate: (collection: ICollection) => void;
    onAddProblem: (collection: ICollection, internaProblemId: string) => Promise<any>;
    onClose: () => void;
    isOpen: boolean;
    collection: ICollection;
}

const addingProblemStyleBase = {
    fontSize: '14px',
};

const successAddingProblemStyle = {
    ...addingProblemStyleBase,
    color: 'green',
};

const failAddingProblemStyle = {
    ...addingProblemStyleBase,
    color: 'red',
};

const defaultState = {
    name: '',
    description: '',
    internalProblemId: '',
    internalProblemStatus: InternalProblemStatus.None,
};

export default class CreateCollection extends React.Component<ICreateCollectionProps, ICreateCollectionState> {

    constructor(props) {
        super(props);
        this.state = {
          ...defaultState,
        };
    }

    onNameChange = (_, name) => this.setState({ name: name });
    onDescriptionChange = (_, description) => this.setState({ description: description });
    onInternalIdChange = (_, internalId) => this.setState({ internalProblemId: internalId });

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
        )
            .then(_ => this.setState({ internalProblemStatus: InternalProblemStatus.Success }))
            .catch(_ => this.setState({ internalProblemStatus: InternalProblemStatus.Fail }));
    }

    componentWillReceiveProps(nextProps: ICreateCollectionProps) {
        let newState = {
            ...defaultState,
        };
        if (nextProps.collection) {
            newState.name = nextProps.collection.Name,
            newState.description = nextProps.collection.Description;
        }
        this.setState(newState);
    }

    getAddingProblemResultText(): string {
        return this.state.internalProblemStatus === InternalProblemStatus.Fail
            ? 'Не удалось добавить задачу'
            : this.state.internalProblemStatus === InternalProblemStatus.Success
                ? 'Задача успешно добавлена'
                : null;
    }

    getAddingProblemResultStyle(): any {
        return this.state.internalProblemStatus === InternalProblemStatus.Fail
            ? failAddingProblemStyle
            : this.state.internalProblemStatus === InternalProblemStatus.Success
                ? successAddingProblemStyle
                : {};
    }

    render() {
        let actionName = this.props.collection ? 'Изменить' : 'Создать';
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
                        onChange={this.onNameChange}
                        hintText={this.state.name ? null : 'Имя коллекции'} />
                </div>

                <div>
                    <TextField
                        name='describe'
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                        multiLine={true}
                        fullWidth
                        rowsMax={4}
                        hintText={this.state.description ? null : 'Описание коллекции'} />
                </div>
                {
                    this.props.collection
                    &&
                    <div>
                        <div className='inlineMiddle'>
                            <TextField
                                name='adding'
                                value={this.state.internalProblemId}
                                errorStyle={this.getAddingProblemResultStyle()}
                                errorText={this.getAddingProblemResultText()}
                                onChange={this.onInternalIdChange}
                                hintText={this.state.internalProblemId ? null : 'Internal id задачи'} />
                        </div>
                        <div className='inlineMiddle' >
                            <FloatingActionButton
                                mini
                                onClick={this.handleAddProblem}>
                                <ContentAdd />
                            </FloatingActionButton>
                        </div>
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