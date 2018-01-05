import axios, { AxiosPromise } from 'axios';
import { ICollection, IProblem, AuthResult } from './typings';

const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};

axios.defaults.params = { crossdomain: true };
axios.defaults.headers = defaultHeaders;
axios.defaults.withCredentials = false;


class BaseApiClient {
    static baseUrl: string;
    static get(url: string, params = {}) {
        return axios.get(`${this.baseUrl}/${url}`, { params })
            .then(response => response.data)
            .catch(err => console.log(err) || Promise.reject('oops'));
    }

    static post(url: string, data?: any, params = {}) {
        return axios.post(`${this.baseUrl}/${url}`, data, { params })
            .then(response => response.data)
            .catch(err => console.log(err) || Promise.reject('oops'));
    }

    static delete(url: string, params = {}) {
        return axios.delete(`${this.baseUrl}/${url}`, { params })
            .then(response => response.data)
            .catch(err => console.log(err) || Promise.reject('oops'));
    }

    static SetApiKey(key: string) {
        axios.defaults.params['api_key'] = key;
    }
}


export class ArchiveClient extends BaseApiClient {
    static Collections = {
        GetCollections: function (limit = 10, offset = 0): Promise<ICollection[]> {
            return ArchiveClient.get('Collections', { limit, offset: offset + 1 });
        },

        GetCollectionById: function (id: ICollection['id']): Promise<ICollection> {
            return ArchiveClient.get(`Collections/${id}`);
        },

        PostCollection: function (collection: ICollection): Promise<ICollection['id']> {
            if (!collection.problems)
                collection.problems = [];
            return ArchiveClient.post('Collections', collection);
        },

        RemoveCollectionById: function (id: ICollection['id'] | ICollection['id'][]): Promise<any> {
            const collectionIds = typeof id === 'string' ? [id] : id;
            return ArchiveClient.delete('api/Collections', collectionIds);
        },

        RemoveProblemFromCollection: function (collectionId: ICollection['id'], internalProblemIds: IProblem['internalProblemId'][]): Promise<any> {
            return ArchiveClient.delete(`/Collections/${collectionId}/problems`, { problemIds: internalProblemIds });
        },

        SetProblemToCollection: function (collectionId: ICollection['id'], internalProblemId: IProblem['internalProblemId']): Promise<any> {
            return ArchiveClient
                .post(`Collections/${collectionId}/problems`, null, { internalProblemId });
        },
    };

    static Problems = {
        GetProblem: function (id: IProblem['internalProblemId']): Promise<IProblem> {
            return ArchiveClient.get(`Problems/${id}`);
        },

        GetProblemStatement: function (id: IProblem['internalProblemId']): Promise<string> {
            return ArchiveClient.get(`Problems/${id}/Statement`);
        },
    };
}

export class AuthClient extends BaseApiClient {
    static Auth(login: string, password: string): Promise<AuthResult> {
        return AuthClient.get('Account/auth', { login, password });
    }
}


ArchiveClient.baseUrl = 'https://archive.sybon.org/api';
AuthClient.baseUrl = 'https://auth.sybon.org/api';