import * as React from 'react';
import WebApiClient from '../WebApi';
import { ICollection, IProblem } from '../typings';
import CollectionTable from './CollectionTable';
import CreateCollection from './CreateCollection';
import Button from 'material-ui-next/Button';
import Paper from 'material-ui-next/Paper';


import Toolbar from 'material-ui-next/Toolbar';
import ProblemTable from '../Problems/ProblemTable';
import CollectionProblemsTableWrapper from './CollectionProblemsTableWrapper';


const styles = {
  propContainer: {
    width: '200px',
    overflow: 'hidden' as 'hidden',
    margin: '20px auto 0',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
};

interface ICollectionWrapperState {
  collections: ICollection[];
  isCreateModalOpen: boolean;
}

export default class CollectionWrapper extends React.Component<any, ICollectionWrapperState> {

  constructor(props) {
    super(props);
    this.state = {
      collections: [],
      isCreateModalOpen: false,
    };
  }

  componentDidMount() {
    WebApiClient.Collections.GetCollections()
      .then(collections => this.setState({ collections: collections || [] }));
  }

  handleCreateCollection = (collection: ICollection) => {
    this.setState(prevState => ({
      collections: prevState.collections.concat(collection),
      isCreateModalOpen: false,
    }));
  }

  handleEditCollection = (collection: ICollection) => {
    this.setState(prevState => ({
      collections: prevState.collections.map(c => collection.Id === c.Id ? collection : c),
      isCreateModalOpen: false,
    }));
  }

  handleAddProblem = (collection: ICollection, internalProblemId: string) => {
    return WebApiClient.Collections.SetProblemToCollection(collection.Id, internalProblemId);
  }

  private toggleIsCreateModalOpen = () => this.setState(
    prevState => ({ isCreateModalOpen: !prevState.isCreateModalOpen })
  )

  private handleCollectionSelected = (selectedId: ICollection['Id']) => {
    this.setState((prevState: ICollectionWrapperState) => ({
      collections: prevState.collections.map((collection, index) => ({
        ...collection,
        isSelected: selectedId === collection.Id && !collection.isSelected,
      })),
    }));
  }

  private removeSelectedCollections = () => {
    this.setState((prevState: ICollectionWrapperState) => ({
      collections: prevState.collections.filter(col => !col.isSelected),
    }));
  }

  render() {
    let selectedCollection = this.state.collections.find(c => c.isSelected);
    return (
      <div>
        <div style={{ marginBottom: 20}}>
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
                    color='primary'
                    onClick={this.removeSelectedCollections}
                    disabled={!selectedCollection}>
                    Удалить
                </Button>
                  <CreateCollection
                    onCreate={selectedCollection ? this.handleEditCollection : this.handleCreateCollection}
                    onClose={this.toggleIsCreateModalOpen}
                    onAddProblem={this.handleAddProblem}
                    isOpen={this.state.isCreateModalOpen}
                    collection={selectedCollection} />
                </div>
              </Toolbar>
            </div>
          </Paper>
        </div>
        <Paper>
          <div className='problemsTableWrapper'>
            <CollectionProblemsTableWrapper collection={selectedCollection} />
          </div>
        </Paper>
      </div>
    );
  }

}

