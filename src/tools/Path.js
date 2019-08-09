import React from 'react';
import {Paper, Breadcrumbs, Link, Typography, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'relative', left: '5%', top: "10px",
        transform: 'translate(-30%, 0%)',
        height: "30px",
        padding: "10px",
    },
    link: {
        cursor: "pointer"
    }
}));

const Path = () => {
    const classes = useStyles();

    const handleClick = () => {
        console.log("click");
    };
    console.log("ich lebe");
    return (
        <Paper elevation={0} className={classes.paper}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
                <Link classes={classes.link} color="primary" to={"/wiki/home"} onClick={handleClick}>
                    Home
                </Link>
                <Link classes={classes.link} color="primary" to={"/wiki/home/ordner"} onClick={handleClick}>
                    Ordner
                </Link>
                <Typography color="textPrimary">Datei</Typography>
            </Breadcrumbs>
        </Paper>
    );
};

export default Path;
