import React from 'react';
import {Typography, Paper} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Markdown from "./Markdown";
import Editor from "../Editor/Editor";

/**
 * Shows the content of a Page
 * @param props [content, readOnly]
 * @returns {*}
 * @constructor
 */
export function Content(props) {
    const fileName = props.title.replace("-", " ");
    return (
        <Paper style={{border: "1px",
            padding: "20px",
            textAlign: "left",
            margin: "10px"}}>
            <Typography color={"inherit"} variant={"h5"}>
                {fileName}
            </Typography>
            <Typography color={"inherit"} variant={"subtitle1"} style={{display: "inline-block",marginRight: "10px"}}>
                Bearbeitet von {"Max Mustermann"} am: {"12.12.12"}
            </Typography>
            <Divider/>
            {props.readOnly ? <Markdown source={props.content}/> : <Editor fileName={fileName} content={props.content}/>}
        </Paper>
    );
};
