import * as React from 'react';
import  { ArchiveClient } from '../WebApi';
import { ICollection, IProblem } from '../typings';
import CollectionTable from './CollectionTable';
import CreateCollection from './CreateCollection';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';


import Toolbar from 'material-ui/Toolbar';
import ProblemTable from '../Problems/ProblemTable';
import ProblemsTableController from '../Problems/ProblemsTableController';
import AddProblem from './AddProblem';
import IconButton from 'material-ui/IconButton/IconButton';

import Update from 'material-ui-icons/Update';
import ConfirmDialog from '../Common/ConfirmDialog';


interface ICollectionControllerState {
  collections: ICollection[];
  collectionIdToDelete: ICollection['id'];
  isCreateModalOpen: boolean;
  iConfirmDeleteModalOpen: boolean;
  isAddProblemModalOpen: boolean;
}

export default class CollectionController extends React.Component<any, ICollectionControllerState> {

  constructor(props) {
    super(props);
    this.state = {
      collections: [],
      isCreateModalOpen: false,
      isAddProblemModalOpen: false,
      iConfirmDeleteModalOpen: false,
      collectionIdToDelete: null,
    };
  }

  private fetchCollections = (newState = {}) => {
    ArchiveClient.Collections.GetCollections()
      .then(collections => this.setState({
        ...newState,
        collections: collections || [],
      })
      );
  }

  componentDidMount() {
    this.fetchCollections();
  }

  private handleCreateCollection = (collection: ICollection) => {
    return ArchiveClient.Collections.PostCollection(collection)
      .then((id) => {
        this.fetchCollections({ isCreateModalOpen: false, })
      });
  }

  private handleEditCollection = (collection: ICollection) => {
    return ArchiveClient.Collections.PostCollection(collection)
      .then(() => {
        this.fetchCollections({ isCreateModalOpen: false, })
      });
  }

  private toggleIsCreateModalOpen = () => this.setState(
    prevState => ({ isCreateModalOpen: !prevState.isCreateModalOpen })
  )

  private toggleisAddProblemModalOpen = () => this.setState(
    prevState => ({ isAddProblemModalOpen: !prevState.isAddProblemModalOpen })
  )

  private handleCollectionSelected = (selectedId: ICollection['id']) => {
    this.setState((prevState: ICollectionControllerState) => ({
      collections: prevState.collections.map((collection, index) => ({
        ...collection,
        isSelected: selectedId === collection.id && !collection.isSelected,
      })),
    }));
  }

  private removeCollection = () => {
    ArchiveClient.Collections.RemoveCollectionById(this.state.collectionIdToDelete)
      .then(() => {
        this.fetchCollections({ iConfirmDeleteModalOpen: false, collectionIdToDelete: null })
      });
  }

  private toggleConfirmDeleteDialog = (id: ICollection['id'] = null) =>
    this.setState(prevState => ({ iConfirmDeleteModalOpen: !prevState.iConfirmDeleteModalOpen, collectionIdToDelete: id }));

  private handleAddProblems = (problemIds: string[]) => {
    let selectedCollection = this.state.collections.find(c => c.isSelected);
    problemIds.forEach(id => ArchiveClient.Collections.SetProblemToCollection(selectedCollection.id, id));
    this.setState({
      isAddProblemModalOpen: false,
    });
  }

  render() {
    let selectedCollection = this.state.collections.find(c => c.isSelected);
    return (
      <div>
        <div style={{ marginBottom: 20 }}>
          <div className='collectionTableWrapper'>
            <CollectionTable
              onRowSelection={this.handleCollectionSelected}
              collections={this.state.collections}
              onDelete={this.toggleConfirmDeleteDialog} />
          </div>
          <Paper>
            <div className='collectionControlWrapper'>
              <Toolbar>
                <div>
                  <Button
                    raised
                    className='marginRight'
                    color='primary'
                    onClick={this.toggleIsCreateModalOpen}>
                    {selectedCollection ? 'Изменить' : 'Создать'}
                  </Button>
                  <Button
                    raised
                    className='marginRight'
                    color='primary'
                    onClick={this.toggleisAddProblemModalOpen}
                    disabled={!selectedCollection}>
                    Добавить задачу
                  </Button>
                  <IconButton style={{ verticalAlign: 'middle' }} color='primary' onClick={this.fetchCollections} >
                    <Update />
                  </IconButton>
                  <CreateCollection
                    onCreate={selectedCollection ? this.handleEditCollection : this.handleCreateCollection}
                    onClose={this.toggleIsCreateModalOpen}
                    isOpen={this.state.isCreateModalOpen}
                    collection={selectedCollection} />
                  {
                    selectedCollection &&
                    <AddProblem
                      open={this.state.isAddProblemModalOpen}
                      onClose={this.toggleisAddProblemModalOpen}
                      collection={selectedCollection}
                      addProblems={this.handleAddProblems}
                    />
                  }
                  <ConfirmDialog
                    agreeCaption='Удалить'
                    disagreeCaption='Оставить'
                    content='Удаление коллекции невозможно отменить. Вы точно хотите сделать это?'
                    isOpen={this.state.iConfirmDeleteModalOpen}
                    title='Удаление коллекции'
                    onAgree={this.removeCollection}
                    onDisagree={this.toggleConfirmDeleteDialog}
                  />
                </div>
              </Toolbar>
            </div>
          </Paper>
        </div>
        <div className='problemsTableWrapper'>
          <Paper>
            <ProblemsTableController
              collection={selectedCollection} />
          </Paper>
        </div>
      </div>
    );
  }
}
