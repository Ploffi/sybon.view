import axios from 'axios';
import {ICollection, IProblem} from './typings';

const api_key = 'dwygVKaI6E6AH4wuGXKt4Q';
const baseUrl = 'https://archive.sybon.org/api/';

const defaultHeaders = {
    'Content-Type' : 'application/json',
    'Accept': 'application/json',
};

const defaultOptions = {
    headers: defaultHeaders,
};

export default class WebApiClient {
    static Collections = {
        GetCollections: function(limit = 10, offset = 0): Promise<ICollection[]> {
            return WebApiClient.get(`Collections?Limit=${limit}&Offset=${offset}&api_key=${api_key}`);
        }, 

        GetCollection: function(id: string): Promise<ICollection> {
            return WebApiClient.get(`Collections/${id}&api_key=${api_key}`);
        },  
        
        PostCollection: function(collection: ICollection): Promise<any> {
            return WebApiClient.post(`Collections?api_key=${api_key}`, collection);
        },
        
        SetProblemToCollection: function(collectionId: string, internalProblemId: string): Promise<any> {
            return WebApiClient
                .post(`Collections/${collectionId}/problem?internalProblemId=${internalProblemId}&api_key=${api_key}`);
        }, 
    };
   
    static Problems = {
        GetProblem: function(id: string): Promise<IProblem> {
            return WebApiClient.get(`Problems/${id}`);
        }, 

        GetProblemStatement: function(id: string): Promise<string> {
            return WebApiClient.get(`Problems/${id}/Statement`);
        },         
    };

    static get(url) {
        return axios.get(`${baseUrl}/${url}`, defaultOptions)
        .then(r => {console.log(r); return r; })
        .then(response => response.data)
        .catch(err => console.log(err));
    }

    static post(url: string, data?: any) {
        return axios.post(`${baseUrl}/${url}`, data, defaultOptions)
        .then(response => response.data)
        .catch(err => console.log(err));
    }


}
