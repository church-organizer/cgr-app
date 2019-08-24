import React, {Component} from 'react';
import {Typography, Paper} from "@material-ui/core";
import ReactMarkdown from "react-markdown";
import Divider from "@material-ui/core/Divider";

/**
 * Shows the content of a Page
 * @param props [content, readOnly]
 * @returns {*}
 * @constructor
 */
export function Content(props) {
    return (
        <Paper style={{border: "1px",
            padding: "20px",
            textAlign: "left",
            margin: "10px"}}>
            <Typography color={"inherit"} variant={"h5"}>
                {props.title.replace('-', ' ')}
            </Typography>
            <Typography color={"inherit"} variant={"subtitle1"} style={{display: "inline-block",marginRight: "10px"}}>
                Bearbeitet von {"Max Mustermann"} am: {"12.12.12"}
            </Typography>
            <Divider/>
            <ReactMarkdown source={props.content}/>
        </Paper>
    );
};