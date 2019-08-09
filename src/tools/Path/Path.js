import React from 'react';
import {Paper, Breadcrumbs, Link, Typography, makeStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    paper: {
        height: "30px",
        padding: "10px",
    },
    link: {
        cursor: "pointer",
    }
}));

const Path = (props) => {
    const classes = useStyles();

    const handleClick = () => {
        console.log("click");
    };

    const fillPath = () => {
        let path = "";
        return (
            <Breadcrumbs separator={">"} aria-label="breadcrumb">
                {props.path.map(dir => {
                    path += "/" + dir;
                    return (<Button component={Link} classes={classes.link} color="primary" to={path} onClick={handleClick}>{dir}</Button>);
                })}
            </Breadcrumbs>
        );
    };

    return (
        <Paper elevation={0} className={classes.paper}>
            {fillPath()}
        </Paper>
    );
};

export default Path;
