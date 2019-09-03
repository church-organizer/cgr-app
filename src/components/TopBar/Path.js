import React from "react";
import {Link} from "react-router-dom";
import {Breadcrumbs} from "@material-ui/core";

const Path = (props) => {
    let path = "";
    return (
        <Breadcrumbs separator={">"} aria-label="breadcrumb">
            <Link color="primary" to={path}>Start</Link>
            {props.folder.map((dir, index) => {
                path += "/" + dir;
                return (<Link key={index} color="primary" to={path}>{dir[0].toUpperCase() + dir.slice(1)}
                </Link>);
            })}
        </Breadcrumbs>
    );
};

export default Path;
