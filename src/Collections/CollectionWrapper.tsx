import * as React from 'react';
import WebApiClient from '../WebApi';
import { ICollection, IProblem, ISelectableCollection } from '../typings';
import CollectionTable from './CollectionTable';
import CreateCollection from './CreateCollection';
import RaisedButton from 'material-ui/RaisedButton';


import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';


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
  collections: ISelectableCollection[];
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

  private handleCollectionSelected = (selectedCollections: number[]) => {
    this.setState((prevState: ICollectionWrapperState) => ({
      collections: prevState.collections.map((collection, index) => ({
        ...collection,
        isSelected: selectedCollections.indexOf(index) !== -1,
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
        <div className='collectionTableWrapper'>
          <CollectionTable
            onRowSelection={this.handleCollectionSelected}
            collections={this.state.collections} />
        </div>
        <div>
          <div className='collectionControlWrapper'>
            <Toolbar>
              <ToolbarGroup>
                <div>
                  <RaisedButton
                    style={{ width: '108px', marginRight: '10px' }}
                    primary
                    onClick={this.toggleIsCreateModalOpen}
                    label={selectedCollection ? 'Изменить' : 'Создать'} />
                  <RaisedButton
                    primary
                    onClick={this.removeSelectedCollections}
                    disabled={!selectedCollection}
                    label={'Удалить'} />
                  <CreateCollection
                    onCreate={selectedCollection ? this.handleEditCollection : this.handleCreateCollection}
                    onClose={this.toggleIsCreateModalOpen}
                    onAddProblem={this.handleAddProblem}
                    isOpen={this.state.isCreateModalOpen}
                    collection={selectedCollection} />
                </div>
              </ToolbarGroup>
            </Toolbar>
          </div>
        </div>
      </div>
    );
  }
}