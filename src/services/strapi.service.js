import { getJwt } from '../services/Authentication';
const axios = require('axios');
export const host = 'https://api.cg-rahden.de/'; 
export let options;

// bevor first login the Bearer token is not set
export function setOptions() {
    if (!options) {
        options = {
            headers: {
                Authorization: `Bearer ${getJwt()}`,
            }
        }
    }
}

export async function getArticles() {
    return await axios.get(host + 'articles', options);
}

export async function getArticleByFilter(filter) {
    return await axios.get(host + 'articles?' + filter, options);
}

export async function getArticleByID(articleId) {
    return await axios.get(host + 'articles?_id=' + articleId, options);
}

export async function getPaths() {
    return await axios.get(host + 'articlepaths', options);
}

export async function getPath(name, pathId) {
    return await axios.get(host + name, {_id: pathId}, options)
}

export async function getMe() {
    return await axios.get('users/me', options);
}