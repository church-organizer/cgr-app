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
    return await axios.get(host + 'articles/' + articleId, options);
}

export async function postArticle(content, title, pathId) {
    const body = {
        content: content,
        title: title,
        path: pathId
    }
    return axios.post(host + 'articles/', body, options);
}

export async function updateArticle(content, title, id) {
    const body = {
        content: content,
        title: title,
    }
    return axios.put(host + 'articles/' + id, body, options);
}

export async function deleteArticle(id) {
    return axios.delete(host + 'articles/' + id, options);
}

export async function getPaths() {
    return await axios.get(host + 'articlepaths', options);
}

export async function getPathById(pathId) {
    return await axios.get(host + 'articlepaths/' + pathId, options);
}

export async function getPathByFiter(filter) {
    return await axios.get(host + 'articlepaths?' + filter, options);
}

export async function postPath(name) {
    return await axios.post(host + 'articlepaths', { path:name }, options);
}

export async function updatePath(name, id) {
    return await axios.put(host + 'articlepaths/' + id, { path:name }, options);
}

export async function getMe() {
    return await axios.get(host + 'users/me', options);
}