import * as React from 'react';
import Table from 'material-ui-next/Table';
import TableRow from 'material-ui-next/Table/TableRow';
import TableCell from 'material-ui-next/Table/TableCell';
import TableBody from 'material-ui-next/Table/TableBody';
import TableHead from 'material-ui-next/Table/TableHead';
import TextField from 'material-ui-next/TextField';
import Dialog from 'material-ui-next/Dialog';
import { IProblem, ICollection } from '../typings';
import Slide from 'material-ui/transitions/Slide';
import { AppBar } from 'material-ui-next';
import Toolbar from 'material-ui/Toolbar/Toolbar';
import IconButton from 'material-ui/IconButton/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import Button from 'material-ui/Button/Button';

import ProblemTable from '../Problems/ProblemTable';
import WebApiClient from '../WebApi';


const globalCollectionId = 1;

interface IAddProblemProps {
  collection: ICollection;
  onClose: () => void;
  addProblems: (selectedIds: IProblem['id'][]) => void;
  open: boolean;
}

interface IAddProblemState {
  filter: string;
  avaliableProblems: IProblem[];
  existingProblems: IProblem[];
}

function Transition(props) {
  return <Slide direction='up' {...props} />;
}

class AddProblem extends React.Component<IAddProblemProps, IAddProblemState> {

  constructor(props) {
    super(props);
    this.state = {
      filter: '',
      avaliableProblems: [],
      existingProblems: [],
    };
  }


  fetchAvaliableProblems(collectionId) {
      return WebApiClient.Collections.GetCollectionById(collectionId)
        .then(data => data.problems);
  }

  componentDidMount() {
    Promise.all( [
      this.fetchAvaliableProblems(this.props.collection.id),
      this.fetchAvaliableProblems(globalCollectionId),
    ]).then(res => this.setState({
      existingProblems: res[0] || [],
      avaliableProblems: res[1] || [],
    }))
    ;
  }

  componentWillReceiveProps(nextProps: IAddProblemProps) {
    if (nextProps.collection.id !== this.props.collection.id ) {
      this.fetchAvaliableProblems(nextProps.collection.id)
        .then(res => this.setState({ existingProblems: res }))
        .catch(console.log);
    }
  }

  handleFilterChange = (event) => this.setState({ filter: event.target.value });

  handleProblemSelected = (selectedId: string) => {
    this.setState(prevState => ({ 
      avaliableProblems: prevState.avaliableProblems.map(p => ({
        ...p,
        isSelected: p.isSelected ? p.id !== selectedId : p.id === selectedId,
      })), 
    }));
  }

  handleAddClick = () => {
    this.props.addProblems(
      this.state.avaliableProblems.filter(p => p.isSelected).map(p => p.internalProblemId)
    );
  }

  render() {
    let filter = (this.state.filter || '').toLowerCase();
    return (
      <div>
        <Dialog
          fullScreen
          open={this.props.open}
          onClose={this.props.onClose}
          transition={Transition}
        >
          <AppBar style={{ position: 'relative' }} >
            <Toolbar>
              <IconButton color='contrast' onClick={this.props.onClose} >
                <CloseIcon />
              </IconButton>
              <Button color='contrast' onClick={this.handleAddClick}>
                Добавить выбранные задачи в коллекцию
              </Button>
            </Toolbar>
          </AppBar>
          <ProblemTable onRowSelection={this.handleProblemSelected} 
            problems={
              this.state.avaliableProblems
                .filter(problem => !this.state.existingProblems.some(p => p.id === problem.id)) } />
        </Dialog>
      </div>
    );
  }
}

export default AddProblem;
