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

export async function getArticle(articleId) {
    return await axios.get(host + 'articles/' + articleId, options);
}

export async function getPaths() {
    return await axios.get(host + 'articlepaths', options);
}

export async function getPath(pathId) {
    return await axios.get(host + 'paths/' + pathId, options);
}

export async function getMe() {
    return await axios.get(host + 'users/me', options);
}