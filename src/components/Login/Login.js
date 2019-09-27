import React from "react";
import {
    Dialog, DialogActions, DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@material-ui/core";
import './Login.css'
import Button from "@material-ui/core/Button";
import FileLoader from "../../services/FileLoader";


/**
 * Mask for Login
 * no params required
 * @param props
 * @returns {*}
 * @constructor
 */
const Login = (props) => {
    const [user, setUser] = React.useState({userName: '', password: ''});


    /**
     * gets called if the input fields changes
     * @param value the changed value
     * @param type "name" or "password"
     */
    const onChange = (value, type) => {
        if (type === "name") {
            setUser({userName: value, password: user.password});
        } else if (type === "password") {
            setUser({userName: user.userName, password: value});
        }
    };

    /**
     * loads the jwt from cache
     * so the user doesnt have to log in every time
     */
    const loadFromCache = () => {

    };

    /**
     * saves the token in the cache
     * @param token
     */
    const saveInCache = (token) => {

    };


    const login = () => {
        fetch(FileLoader.url + "login", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: user.userName,
                password: user.password
            })
        }).then(res => {
            console.log(res);
            if (res.status === 200) {
                props.onSuccess();
            }
            // props.onSuccess();
        }).catch(error => {
            console.error(error);
        });
    };

    return (
        <Dialog open={props.open} onBackdropClick={() => props.onAbort()} onEscapeKeyDown={()=> props.onAbort()}>
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
                <DialogContentText>Bitte logge dich erstmal ein.</DialogContentText>
                <div className="input">
                    <TextField value={user.userName} autoFocus required fullWidth margin={"dense"}
                               variant={"outlined"} placeholder={"username"} type={"text"}
                               onChange={(event) => onChange(event.target.value, "name")}/>
                    <TextField value={user.password} className={"inputFields"} fullWidth required
                               placeholder={"password"} margin={"dense"}
                               variant={"outlined"} type={"password"}
                               onChange={(event => onChange(event.target.value, "password"))}/>
                </div>
            </DialogContent>
            <DialogActions>
                <Button variant={"outlined"} color={"secondary"} onClick={() => props.onAbort()}>Abbrechen</Button>
                <Button variant={"outlined"}
                        color={"primary"}
                        onClick={() => login()}>
                    Login
                </Button>
            </DialogActions>
        </Dialog>
    );
};


export default Login;
