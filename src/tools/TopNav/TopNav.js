import React from 'react';
import {AppBar, Button, Toolbar, Typography, makeStyles} from "@material-ui/core";
import {Link} from "react-router-dom";


const useStyles = makeStyles(theme =>({
    appBar: {
        position: "static",
        height: "64px"
    },
    toolbar: theme.mixins.toolbar,
    typography: {
        flexGrow: 1
    },
    loginButton: {
        right: "20px",
        position: "absolute"
    },
}));


const TopNav = (props) => {
    const classes = useStyles();
    return (
        <AppBar className={classes.appBar}>
            <Toolbar>
                <Typography variant="h5">
                    <Link to="/" className="home-button">Organizer</Link>
                </Typography>
                <Typography variant="h6">
                    <Link to="/wiki" className="nav-button">Wiki</Link>
                </Typography>
                <Typography variant="h6">
                    <Link to="/rating" className="nav-button">Bewerten</Link>
                </Typography>
                <Typography variant="h6">
                    <Link to="/media" className="nav-button">Medien</Link>
                </Typography>

                <Button color="inherit" className={classes.loginButton}>Login</Button>
            </Toolbar>
        </AppBar>
    );
};

export default TopNav;
