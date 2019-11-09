import React, {useContext, useState, useEffect} from "react";
import { Redirect } from 'react-router-dom';
import {
    Dialog, DialogActions, DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@material-ui/core";
import './Login.css'
import Button from "@material-ui/core/Button";
import StateContext from "../../contexts/StateContext";
import { login, saveJwt, checkLoggedIn } from '../../services/Authentication';

/**
 * Mask for Login
 * no params required
 * @param props
 * @returns {*}
 * @constructor
 */
const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const loginState = useContext(StateContext).login;

    // todo: use isAuthenticated in secured routes and not here
    useEffect(() => {
        checkLoggedIn().then(() => {
            loginState.changeLoginState(false, true, true, 'test');
        }).catch((err) => {
            loginState.changeLoginState(true, false, false, '');
            console.log('error: ', err);
            return <Redirect to='/login' />
        });
    }, []);
    
    /**
     * gets called if the input fields changes
     * @param value the changed value
     * @param type "name" or "password"
     */
    const onChange = (value, type) => {
        if (type === "name") {
            setUsername(value);
        } else if (type === "password") {
            setPassword(value);
        }
    };


    const abort = () => {
        loginState.changeLoginState(false, false, true, '');
    };


    const checkLogin = () => {
        login(username, password).then((res) => {
            saveJwt(res.data.jwt);
            loginState.changeLoginState(false, true, true, username);
        }).catch((err) => {
            console.log(`login Error: `, err);
        });
    }

    const handleClick = (event) => {
        event.preventDefault();
        checkLogin();
    }

    return (
        <Dialog open={loginState.open} onBackdropClick={() => abort()} onEscapeKeyDown={()=> abort()}>
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
                <DialogContentText>Bitte logge dich erstmal ein.</DialogContentText>
                <div className="input">
                    <TextField value={username} autoFocus required fullWidth margin={"dense"}
                               variant={"outlined"} placeholder={"username"} type={"text"}
                               onChange={(event) => onChange(event.target.value, "name")}/>
                    <TextField value={password} className={"inputFields"} fullWidth required
                               placeholder={"password"} margin={"dense"}
                               variant={"outlined"} type={"password"}
                               onChange={(event => onChange(event.target.value, "password"))}/>
                </div>
            </DialogContent>
            <DialogActions>
                <Button variant={"outlined"} color={"secondary"} onClick={() => abort()}>Abbrechen</Button>
                <Button variant={"outlined"}
                        color={"primary"}
                        onClick={() => handleClick}>
                    Login
                </Button>
            </DialogActions>
        </Dialog>
    );
};


export default Login;
