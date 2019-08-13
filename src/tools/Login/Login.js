import React from "react";
import {Box, Container, DialogContentText, makeStyles, Paper, Tab, Tabs, TextField} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";


const useStyles = makeStyles(theme => ({
    loginWindow: {
        position: 'absolute',
        top: "20%",
        left: "30%",
        right: "30%",
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: "40%",
        height: "50%"
    },
    paper: {
        width: "100%",
        margin: "20px"
    },
    link: {
        margin: "10px"
    }
}));

const TabPanel = (props) => {
    const {children, value, index, ...other} = props;

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


const Login = (props) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [user, setUser] = React.useState({userName: '', password: ''});
    const onChangeHandler = (event, newValue) => {
        setValue(newValue);
    };


    const onInputChangeHandler = (event) => {
        if (event.target.id === 'name') {
            setUser({userName: event.target.value, password: user.password});
        } else if (event.target.id === 'password') {
            setUser({userName: user.userName, password: event.target.value});
        }
    };

    /**
     * todo login logic
     */
    const login = () => {
        props.onLogin.setState({login: {isLoggedIn: true, username: user.username}});
    };

    const loginPossibilities = ['Churchtools', 'Google', 'Facebook'];

    return (
        <Box className={classes.loginWindow}>
            <Paper className={classes.paper}>
                <AppBar position={"static"} style={{borderRadius: "3px"}}>
                    <Tabs onChange={onChangeHandler} variant={"fullWidth"} value={value} indicatorColor="secondary" textColor="inherit" centered>
                        {
                            loginPossibilities.map((item, index)=> {return <Tab key={index} label={item}/> })
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
                                <Button variant={"contained"}onClick={login}>Login</Button>
                                <Link className={classes.link} to={"/register"}>registrieren</Link>
                            </FormControl>
                        </TabPanel>)
                    })}
                </Container>

            </Paper>
        </Box>
    );
};


export default Login
