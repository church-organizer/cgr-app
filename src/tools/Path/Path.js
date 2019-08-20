import React from 'react';
import {Paper, Breadcrumbs, makeStyles, Button} from "@material-ui/core";
import {Link} from "react-router-dom";


const Path = (props) => {
    const fillPath = () => {
        let path = "/wiki";
        return (
            <Breadcrumbs separator={">"} aria-label="breadcrumb">
                <Link style={{cursor: "pointer"}} color="primary" to={path}>
                    <Button  variant={"contained"} size={"small"}>Start</Button>
                </Link>
                {props.path.map((dir, index) => {
                    path += "/" + dir;
                    return (<Link key={index} style={{cursor: "pointer"}} color="primary" to={path}>
                        <Button  variant={"contained"} size={"small"}>{dir}</Button>
                    </Link>);
                })}
            </Breadcrumbs>
        );
    };

    return (
        <Paper elevation={0} style={{height: "30px",padding: "10px",}}>
            {fillPath()}
        </Paper>
    );
};

export default Path;
