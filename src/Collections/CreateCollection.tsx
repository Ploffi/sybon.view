import * as React from 'react';
import TextField from 'material-ui-next/TextField';
import Button from 'material-ui-next/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui-next/Dialog';
import { ICollection } from '../typings';
import IconButton from 'material-ui-next/IconButton';


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

    onNameChange = (e) => this.setState({ name: e.target.value });
    onDescriptionChange = (e) => this.setState({ description: e.target.value });
    onInternalIdChange = (e) => this.setState({ internalProblemId: e.target.value });

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

    getAddingProblemResultClassName(): string {
        return this.state.internalProblemStatus === InternalProblemStatus.Fail
            ? 'failAddingProblemStyle'
            : this.state.internalProblemStatus === InternalProblemStatus.Success
                ? 'successAddingProblemStyle'
                : '';
    }

    render() {
        let actionName = this.props.collection ? 'Изменить коллекцию' : 'Создать коллекцию';
        const actions = [
            ,
        ];

        return (
            <Dialog
                fullWidth
                maxWidth='md'
                open={this.props.isOpen}
                onRequestClose={this.props.onClose} >

                <DialogTitle>{actionName}</DialogTitle>
                <DialogContent>
                    <div>
                        <TextField
                            name='name'
                            value={this.state.name}
                            onChange={this.onNameChange}
                            placeholder='Имя коллекции' />
                    </div>

                    <div>
                        <TextField
                            name='describe'
                            value={this.state.description}
                            onChange={this.onDescriptionChange}
                            multiline={true}
                            fullWidth
                            rowsMax={4}
                            placeholder='Описание коллекции' />
                    </div>
                    {
                        this.props.collection
                        &&
                        <div>
                            <div className='inlineMiddle'>
                                <TextField
                                    name='adding'
                                    value={this.state.internalProblemId}
                                    helperTextClassName={this.getAddingProblemResultClassName()}
                                    helperText={this.getAddingProblemResultText()}
                                    error={this.state.internalProblemStatus === InternalProblemStatus.Fail}
                                    onChange={this.onInternalIdChange}
                                    placeholder='Internal id задачи' />
                            </div>
                            <div className='inlineMiddle' >
                                <IconButton onClick={this.handleAddProblem}>
                                    <i style={{fontSize: 36}} className='material-icons'>add_circle</i>
                                </IconButton>
                            </div>
                        </div>
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCreateButtonClick}>
                        {actionName}
                    </Button>
                </DialogActions>

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