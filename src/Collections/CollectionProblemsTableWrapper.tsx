import * as React from 'react';
import { ICollection } from '../typings';
import WebApiClient from '../WebApi';

interface CollectionProblemsTableWrapperProps {
    collection: ICollection;
}

interface CollectionProblemsTableWrapperState {
    loading: boolean;
}

//todo: добавить лоадинг
export default class CollectionProblemsTableWrapper extends React.Component<CollectionProblemsTableWrapperProps, CollectionProblemsTableWrapperState> {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }

    render() {
        if (!this.props.collection)
            return null;
        return null;
    }

    componentDidUpdate() {

    }

    async renderSelectedCollectionProblemsTable(selectedCollection: ICollection) {
        if (!selectedCollection)
          return null;
        
        let collectionWithProblems = await WebApiClient.Collections.GetCollection(selectedCollection.Id);
        if (!collectionWithProblems)
          return null;
    
      }
}