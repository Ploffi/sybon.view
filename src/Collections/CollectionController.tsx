import * as React from 'react';
import WebApiClient from '../WebApi';
import { ICollection, IProblem } from '../typings';
import CollectionTable from './CollectionTable';
import CreateCollection from './CreateCollection';
import Button from 'material-ui-next/Button';
import Paper from 'material-ui-next/Paper';


import Toolbar from 'material-ui-next/Toolbar';
import ProblemTable from '../Problems/ProblemTable';
import ProblemsTableController from '../Problems/ProblemsTableController';
import AddProblem from './AddProblem';
import IconButton from 'material-ui/IconButton/IconButton';

import Update from 'material-ui-icons/Update';


interface ICollectionControllerState {
  collections: ICollection[];
  isCreateModalOpen: boolean;
  isAddProblemModalOpen: boolean;
}

export default class CollectionController extends React.Component<any, ICollectionControllerState> {

  constructor(props) {
    super(props);
    this.state = {
      collections: [],
      isCreateModalOpen: false,
      isAddProblemModalOpen: false,
    };
  }

  private fetchCollections = () => {
    WebApiClient.Collections.GetCollections()
      .then(collections => this.setState({
        collections: (collections && collections.slice(1)) || [],
      })
      );
  }

  componentDidMount() {
    this.fetchCollections();
  }

  private handleCreateCollection = (collection: ICollection) => {
    return WebApiClient.Collections.PostCollection(collection)
      .then((id) => {
        collection.id = id;
        this.setState(prevState => ({
          collections: prevState.collections.concat(collection),
          isCreateModalOpen: false,
        }));
      });
  }

  private handleEditCollection = (collection: ICollection) => {
    return WebApiClient.Collections.PostCollection(collection)
      .then(() => {
        this.setState(prevState => ({
          collections: prevState.collections.map(c => collection.id === c.id ? collection : c),
          isCreateModalOpen: false,
        }));
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


  private removeSelectedCollections = () => {
    let selectedColIndex = this.state.collections.findIndex(col => col.isSelected);
    let selectedColId = this.state.collections[selectedColIndex].id;
    WebApiClient.Collections.RemoveCollectionById(selectedColId)
      .then(() => {
        this.setState((prevState: ICollectionControllerState) => ({
          collections: prevState.collections.splice(selectedColIndex, 1),
        }));
      });
  }

  handleAddProblems = (problemIds: string[]) => {
    let selectedCollection = this.state.collections.find(c => c.isSelected);
    problemIds.forEach(id => WebApiClient.Collections.SetProblemToCollection(selectedCollection.id, id));
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
              collections={this.state.collections} />
          </div>
          <Paper>
            <div className='collectionControlWrapper'>
              <Toolbar>
                <div>
                  <Button
                    raised
                    style={{ width: '108px', marginRight: '10px' }}
                    color='primary'
                    onClick={this.toggleIsCreateModalOpen}>
                    {selectedCollection ? 'Изменить' : 'Создать'}
                  </Button>
                  <Button
                    raised
                    style={{ marginRight: '10px' }}
                    color='primary'
                    onClick={this.toggleisAddProblemModalOpen}
                    disabled={!selectedCollection}>
                    Добавить задачу
                  </Button>
                  <Button
                    raised
                    color='primary'
                    onClick={this.removeSelectedCollections}
                    disabled={!selectedCollection}>
                    Удалить
                  </Button>
                  <IconButton style={{verticalAlign: 'middle'}} color='primary' onClick={this.fetchCollections} >
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

