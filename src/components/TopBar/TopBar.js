import React from 'react';
import {Paper, Breadcrumbs, makeStyles} from "@material-ui/core";
import {Link} from "react-router-dom";

const useStyle = makeStyles(theme=>({
    root: {
        height: "30px",
        padding: "10px"
    }
}));

const TopBar = (props) => {
    const classes = useStyle();
    const fillPath = () => {
        let path = "/";
        return (
            <Breadcrumbs separator={">"} aria-label="breadcrumb">
                <Link color="primary" to={path}>Start</Link>
                {props.path.map((dir, index) => {
                    path += "" + dir;
                    return (<Link key={index} color="primary" to={path}>{dir}
                    </Link>);
                })}
            </Breadcrumbs>
        );
    };

    return (
        <Paper className={classes.root} elevation={0}>
            {fillPath()}
        </Paper>
    );
};

export default TopBar;
