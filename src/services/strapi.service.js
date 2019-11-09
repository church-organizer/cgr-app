import { getJwt } from './authentication.service';
import qs from 'qs';
const axios = require('axios');
export const host = 'https://api.cg-rahden.de/'; 

// bevor first login the Bearer token is not set
export function getOptions() {
    if (getJwt()) {
        return {
            headers: {
                Authorization: `Bearer ${getJwt()}`,
            }
        }
    }
}

async function getContent(type) {
    return await axios.get(host + type, getOptions());
}

async function getContentByFilter(type, filter) {
    return await axios.get(host + type + '?' + filter, getOptions());
}

async function getContentById(type, id) {
    return await axios.get(host + type + '/' + id, getOptions());
}

async function postContent(type, body) {
    return await axios.post(host + type, body, getOptions());
}

async function updateContent(type, id, body) {
    return await axios.put(host + type + '/' + id, body, getOptions());
} 

async function deleteContent(type, id) {
    return await axios.delete(host + type + '/' + id, getOptions());
}

export function getArticles() {
    return getContent('articles');
}

export async function getArticleByFilter(filter) {
    return getContentByFilter('articles', filter);
}

export async function getArticleByID(articleId) {
    return getContentById('articles', articleId);
}

export async function postArticle(content, title, pathId) {
    const body = {
        content: content,
        title: title,
        path: pathId
    }
    return postContent('articles', body);
}

export async function updateArticle(content, title, id) {
    const body = {
        content: content,
        title: title,
    }
    return updateContent('articles', id, body);
}

export async function deleteArticle(id) {
    return deleteContent('articles', id);
}

export async function getPaths() {
    return getContent('articlepaths');
}

export async function getPathById(pathId) {
    return getContentById('articlepaths', pathId);
}

export async function getPathByFiter(filter) {
    return getContentByFilter('articlepaths', filter);
}

export async function postPath(name) {
    return postContent('articlepaths', { path:name });
}

export async function updatePath(name, id) {
    return updateContent('articlepaths', id, { path:name });
}

export async function getMe() {
    return getContent('users/me');
}

export async function postImage(formData) {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${getJwt()}`
        },
        data: qs.stringify(formData),
    };

    return await axios.post(host + "upload", qs.stringify(formData), config);
}