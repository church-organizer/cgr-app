import React from 'react';
import {Paper, Breadcrumbs, makeStyles, Button} from "@material-ui/core";
import {Link} from "react-router-dom";


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


    const fillPath = () => {
        let path = "/wiki";
        return (
            <Breadcrumbs separator={">"} aria-label="breadcrumb">
                <Link className={classes.link} color="primary" to={path}>
                    <Button  variant={"contained"} size={"small"}>Start</Button>
                </Link>
                {props.path.map((dir, index) => {
                    path += "/" + dir;
                    return (<Link key={index} className={classes.link} color="primary" to={path}>
                        <Button  variant={"contained"} size={"small"}>{dir}</Button>
                    </Link>);
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
