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

const loginUrl = "localhost:3001/login";

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
    const [value, setValue] = useState(0);
    const [user, setUser] = useState({ userName: '', password: '' });
    const [loggedIn, setLoggedIn] = useState(false);
    // const loginUrl = "https://churchtools.cg-rahden.de/index.php?q=login/ajax";

    const onChangeHandler = (event, newValue) => {
        setValue(newValue);
    };

    const onInputChangeHandler = (event) => {
        if (event.target.id === 'name') {
            setUser({ userName: event.target.value, password: user.password });
        } else if (event.target.id === 'password') {
            setUser({ userName: user.userName, password: event.target.value });
        }
    };

    (() => {
        // if token exists and is valid exit hier
        // set user.username
        // props.onLogin(user.username)
    })();

    const checkLogin = (username, password) => {
        login(username, password).then((res) => {
            Cookies.set('jwt', res.data.jwt);
            props.onLogin(user.userName);
        }).catch((err) => {
            console.log(err);
        });
    }
    /**
     * todo login logic
     */
    // const login = () => {
    //     fetch(loginUrl, {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: [JSON.stringify({
    //             func: 'login',
    //             email: user.userName,
    //             password: user.password
    //         })]
    //     }).then(res => {
    //         console.log(res);
    //     }).catch(error => {
    //         console.error(error);
    //     });
    //     window.location.pathname = "/";
    //     props.onLogin(user.userName);
    // };

    const loginPossibilities = ['Churchtools'];
    console.log(props);
    return (
        <Box className="loginWindow">
            <Paper style={{ width: "100%", margin: "20px" }}>
                <AppBar position={"static"} style={{ borderRadius: "3px" }} classes={{ colorPrimary: classes.topBar }}>
                    <Tabs onChange={onChangeHandler} variant={"fullWidth"} value={value} indicatorColor="secondary"
                        textColor="inherit" centered>
                        {
                            loginPossibilities.map((item, index) => {
                                return <Tab key={index} label={item} />
                            })
                        }
                    </Tabs>
                </AppBar>
                <Container>
                    {loginPossibilities.map((item, index) => {
                        return (<TabPanel key={index} value={value} index={index}>
                            <DialogContentText>
                                {item} Login
                            </DialogContentText>
                            <FormControl component={"form"}>
                                <TextField
                                    autoFocus margin="dense" id="name" label="LoginName" type="text" fullWidth
                                    variant={"outlined"} onChange={onInputChangeHandler}
                                    required={true} value={user.userName}
                                // helperText={"LoginName oder Email"}
                                />
                                <TextField
                                    margin="dense" id="password" label="Password" type="password" fullWidth
                                    variant={"outlined"} onChange={onInputChangeHandler}
                                    required={true} value={user.password}
                                // helperText={"Dein Passwort"}
                                />
                                <Link onClick={checkLogin(user.userName, user.password)}><Button type={"submit"}
                                    variant={"contained"}>Login</Button></Link>
                            </FormControl>
                        </TabPanel>)
                    })}
                </Container>

            </Paper>
        </Box>
    );
};


export default Login
