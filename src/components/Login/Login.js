import React, {useState} from "react";
import {
    Dialog, DialogActions, DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@material-ui/core";
import './Login.css'
import Button from "@material-ui/core/Button";


/**
 * Mask for Login
 * no params required
 * @param props
 * @returns {*}
 * @constructor
 */
const Login = (props) => {
    const [user, setUser] = React.useState({userName: '', password: ''});
    const loginUrl = "https://churchtools.cg-rahden.de/index.php?q=login/ajax";
    const [loggedIn, setLoggedIn] = useState(false);


    const onChange = (value, type) => {
        if (type === "name") {
            setUser({userName: value, password: user.password});
        } else if (type === "password") {
            setUser({userName: user.userName, password: value});
        }
    };

    const loadFromCache = () => {

    };


    const login = () => {
        fetch(loginUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: [JSON.stringify({
                func: 'login',
                email: user.userName,
                password: user.password
            })]
        }).then(res => {
            console.log(res);
        }).catch(error => {
            console.error(error);
        });
    };

    return (
        <Dialog open={props.open}>
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
                <Button type={"submit"} onClick={() => {
                    login()
                }} variant={"outlined"} color={"secondary"}>Abbrechen</Button>
                <Button variant={"outlined"} color={"primary"}>Login</Button>
            </DialogActions>
        </Dialog>
    );
};


export default Login;
