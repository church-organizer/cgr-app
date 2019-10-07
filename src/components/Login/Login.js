import React, { useState } from "react";
import { Box, Container, DialogContentText, makeStyles, Paper, Tab, Tabs, TextField } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import './Login.css'
import { login } from '../../services/Authentication';
import Cookies from 'js-cookie'

const useStyle = makeStyles(theme => ({
    topBar: {
        background: "linear-gradient(to bottom, #454AA3 0%, #363A7F 44%, #2D316B 100%)"
    }
}));


const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
};

/**
 * Mask for Login
 * no params required
 * @param props
 * @returns {*}
 * @constructor
 */
const Login = (props) => {
    const classes = useStyle();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleClick = (event) => {
        event.preventDefault();
        checkLogin();
    }

    const checkLogin = () => {
        login(username, password).then((res) => {
            Cookies.set('jwt', res.data.jwt);
            props.onLogin(username);
        }).catch((err) => {
            console.log(`login Error: `, err);
        });
    }

    return (
        <Box className="loginWindow">
            <Paper style={{ width: "100%", margin: "20px" }}>
                <AppBar position={"static"} style={{ borderRadius: "3px" }} classes={{ colorPrimary: classes.topBar }}>
                    <Tabs variant={"fullWidth"} indicatorColor="secondary"
                        textColor="inherit" centered>
                    </Tabs>
                </AppBar>
                <Container>
                    <TabPanel>
                        <DialogContentText>
                            Login
                            </DialogContentText>
                        <FormControl component={"form"}>
                            <TextField
                                autoFocus margin="dense" id="name" label="LoginName" type="text" fullWidth
                                variant={"outlined"} onChange={handleUsernameChange}
                                required={true} value={username}
                            // helperText={"LoginName oder Email"}
                            />
                            <TextField
                                margin="dense" id="password" label="Password" type="password" fullWidth
                                variant={"outlined"} onChange={handlePasswordChange}
                                required={true} value={password}
                            // helperText={"Dein Passwort"}
                            />
                            <Link onClick={handleClick}><Button type={"submit"}
                                variant={"contained"}>Login</Button></Link>
                        </FormControl>
                    </TabPanel>
                </Container>

            </Paper>
        </Box>
    );
};


export default Login
