import Cookies from 'js-cookie'
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { getMe } from './strapi.service';

const HOST = 'http://api.cg-rahden.de/';
const AUTH_PATH = 'users/me';
const LOGIN_PATH = 'auth/local';

export function getJwt() {
    return localStorage.getItem('strapi-jwt');
}

export function saveJwt(jwt) {
    localStorage.setItem('strapi-jwt', jwt);
}

export async function login(username, password) {
    const res = await axios.post(HOST + LOGIN_PATH, {
        identifier: username,
        password: password
    });

    return res;
}


export async function checkLoggedIn() {
    if (!getJwt()) {
      return false;
    }
  
    const me = await getMe();
    if (me.data && validateJwt()) {
      return true;
    }
    return false;
}
  
function validateJwt() {
    const jwt = getJwt();
    const decodedJwt = jwtDecode(jwt);
    if (Date.now() >= decodedJwt.exp * 1000) {
        return false;
    }
    return true;
  }