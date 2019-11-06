import Cookies from 'js-cookie'
import axios from 'axios';

const HOST = 'http://localhost:3001/';
const AUTH_PATH = 'authenticate/';
const LOGIN_PATH = 'login/';

export function isAuthenticated() {
    const jwt = Cookies.get('jwt');

    return axios({
        method: 'post',
        url: HOST + AUTH_PATH,
        headers: {
            'authorization': jwt
        }
    })
}

export function login(username, password) {
    return axios.post(HOST + LOGIN_PATH, {
        name: username,
        password: password
    });
}