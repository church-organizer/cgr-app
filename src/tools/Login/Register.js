import React from "react";
import {Box, Container, makeStyles, Paper} from "@material-ui/core";


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

/**
 * todo das muss zur richtigen zeit angezeigt werden, nur wenn man auf den register button drückt oder auf die /register url
 * @param props
 * @returns {*}
 * @constructor
 */
const Register = (props) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [user, setUser] = React.useState({userName: '', password: ''});



    const onInputChangeHandler = (event) => {
        // if (event.target.id === 'name') {
        //     setUser({userName: event.target.value, password: user.password});
        // } else if (event.target.id === 'password') {
        //     setUser({userName: user.userName, password: event.target.value});
        // }
    };

    /**
     * todo register logic
     */
    const register = () => {
    };

    const loginPossibilities = ['Churchtools', 'Google', 'Facebook'];

    return (
        <Box className={classes.loginWindow}>
            <Paper className={classes.paper}>

                <Container>
                    <p>Hier der Register Bereich</p>
                </Container>

            </Paper>
        </Box>
    );
};


export default Register
