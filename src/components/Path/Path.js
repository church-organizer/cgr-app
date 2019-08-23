import React from 'react';
import {Paper, Breadcrumbs, Button} from "@material-ui/core";
import {Link} from "react-router-dom";


const Path = (props) => {
    const fillPath = () => {
        let path = "/";
        return (
            <Breadcrumbs separator={">"} aria-label="breadcrumb">
                <Link style={{cursor: "pointer"}} color="primary" to={path}>Start</Link>
                {props.path.map((dir, index) => {
                    path += "" + dir;
                    return (<Link key={index} style={{cursor: "pointer"}} color="primary" to={path}>{dir}
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
