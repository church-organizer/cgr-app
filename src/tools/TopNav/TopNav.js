import React from 'react';
import {AppBar, Button, Toolbar, Typography, makeStyles, InputBase} from "@material-ui/core";
import {Link} from "react-router-dom";


const useStyles = makeStyles(theme => ({
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
    inputRoot: {
        color: 'inherit',
        width: "100%"
    },
    homeButton: {

    },
    inputInput: {
        position: "relative",
        padding: theme.spacing(1, 1, 1, 1),
        transition: theme.transitions.create('width'),
        width: '30%',
        border: "1px solid #eee",
        borderRadius: "3px",
        marginLeft: "20%"
    },
    navButton: {
        padding: "8px",
        margin: "4px",
        color: "#eee"
    }
}));


const TopNav = (props) => {
    const classes = useStyles();
    return (
        <AppBar className={classes.appBar}>
            <Toolbar>
                <Typography className={classes.navButton} variant="h5">
                    <Link id={"homeButton"} to="/"><Button color={"primary"} variant={"contained"} size={"large"}>Organizer</Button></Link>
                </Typography>
                <Typography className={classes.navButton} variant="h6">
                    <Link to="/wiki" ><Button color={"inherit"} variant={"contained"}>Wiki</Button></Link>
                </Typography>
                <Typography color={"secondary"} className={classes.navButton} variant="h6">
                    <Link to="/rating"><Button color={"inherit"} variant={"contained"}>Bewerten</Button></Link>
                </Typography>
                <Typography className={classes.navButton} variant="h6">
                    <Link to="/media"><Button color={"inherit"} variant={"contained"}>Medien</Button></Link>
                </Typography>
                <Button href={"https://material-ui.com/getting-started/usage/"} color={"secondary"}
                        variant={"outlined"}>Design</Button>
                <Button href={"https://github.com/ckeditor/ckeditor5-react"} color={"secondary"}
                        variant={"outlined"}>Editor</Button>

                <InputBase
                    placeholder="Suche…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                        focused: classes.inputFocus
                    }}
                    inputProps={{'aria-label': 'search'}}
                />


                <Button variant={"contained"} className={classes.loginButton}>Login</Button>
            </Toolbar>
        </AppBar>
    );
};

export default TopNav;
