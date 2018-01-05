import * as React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import { ICollection } from '../typings';
import IconButton from 'material-ui/IconButton';


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
    onCreate: (collection: ICollection) => Promise<any>;
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

    handleCreateButtonClick = () => {
        this.props.onCreate({
            id: guid(),
            ...this.props.collection,
            name: this.state.name,
            description: this.state.description,
            problems: [],
        } as ICollection)
            .catch();
    }

    componentWillReceiveProps(nextProps: ICreateCollectionProps) {
        let newState = {
            ...defaultState,
        };
        if (nextProps.collection) {
            newState.name = nextProps.collection.name,
                newState.description = nextProps.collection.description;
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
        return (
            <Dialog
                fullWidth
                maxWidth='md'
                open={this.props.isOpen}
                onClose={this.props.onClose} >

                <DialogTitle>{actionName}</DialogTitle>
                <DialogContent>
                    <div>
                        <TextField
                            autoFocus
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