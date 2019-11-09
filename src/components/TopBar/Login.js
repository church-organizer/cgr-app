import React, { useContext } from "react";
import StateContext from "../../contexts/StateContext";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from "@material-ui/core/IconButton";
import * as LoginPopup from '../Login/Login';
import { logout } from '../../services/authentication.service';

const Login = (props) => {
    const loginState = useContext(StateContext).login;
    const icon = loginState.isLoggedIn ?
        <IconButton 
            onClick={() => {
                logout();
                loginState.changeLoginState(false, false, false, '');
            }}
            variant={"contained"}
            color={"primary"}
            style={{float: "right", marginRight: '30px'}}>
            <ExitToAppIcon fontSize={"inherit"}/>
        </IconButton>
    :
    <IconButton 
            onClick={() => {
                loginState.changeLoginState(true, false, false, '');
            }}
            variant={"contained"}
            color={"primary"}
            style={{float: "right", marginRight: '30px'}}>
            <AccountCircleIcon fontSize={"inherit"}/>
    </IconButton>;                 

    return icon;
}

export default Login;