import React from 'react';
import {Paper, Breadcrumbs, Link, makeStyles} from "@material-ui/core";

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
                {props.path.map((dir, index) => {
                    path += "/" + dir;
                    return (<Link key={index} component={'a'} className={classes.link} color="primary" to={path} onClick={handleClick}>{dir}</Link>);
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
