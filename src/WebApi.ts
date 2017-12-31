import axios from 'axios';
import { ICollection, IProblem } from './typings';

export const api_key = 'cH6RsMyZzkibnuQmGtS2Q';
const baseUrl = 'https://archive.sybon.org/api';

const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};

axios.defaults.params = { crossdomain: true};
axios.defaults.params['api_key'] = api_key;
axios.defaults.headers = defaultHeaders;
axios.defaults.withCredentials = true;

export default class WebApiClient {
    static Collections = {
        GetCollections: function (limit = 10, offset = 0): Promise<ICollection[]> {
            return WebApiClient.get('Collections', { limit, offset: offset + 1 });
        },

        GetCollectionById: function (id: string): Promise<ICollection> {
            return WebApiClient.get(`Collections/${id}`);
        },

        PostCollection: function (collection: ICollection): Promise<ICollection['id']> {
            if (!collection.problems)
                collection.problems = [];
            return WebApiClient.post('Collections', collection);
        },

        RemoveCollectionById: function (id: string | string[]): Promise<any> {
            const collectionIds = typeof id === 'string' ? [id] : id;
            return WebApiClient.delete('api/Collections', collectionIds);
        },
        
        RemoveProblemFromCollection: function (collectionId: string, internalProblemIds: string[]): Promise<any> {
            return WebApiClient.delete(`/Collections/${collectionId}/problems`, { problemIds: internalProblemIds });
        },

        SetProblemToCollection: function (collectionId: string, internalProblemId: string): Promise<any> {
            return WebApiClient
                .post(`Collections/${collectionId}/problems`, null, { internalProblemId });
        },
    };

    static Problems = {
        GetProblem: function (id: string): Promise<IProblem> {
            return WebApiClient.get(`Problems/${id}`);
        },

        GetProblemStatement: function (id: string): Promise<string> {
            return WebApiClient.get(`Problems/${id}/Statement`);
        },
    };

    static get(url: string, params = {}) {
        return axios.get(`${baseUrl}/${url}`, { params })
            .then(response => response.data)
            .catch(err => console.log(err) || Promise.reject('oops'));
    }

    static post(url: string, data?: any, params = {}) {
        return axios.post(`${baseUrl}/${url}`, data, { params })
            .then(response => response.data)
            .catch(err => console.log(err) || Promise.reject('oops'));
    }

    static delete(url: string, params = {}) {
        return axios.delete(`${baseUrl}/${url}`, { params })
            .then(response => response.data)
            .catch(err => console.log(err) || Promise.reject('oops'));
    }
}
