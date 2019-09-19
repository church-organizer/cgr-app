import React from 'react';
import {Typography, Paper} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Markdown from "./Markdown";
import Editor from "../Editor/Editor";
import "./PageContent.css"

/**
 * Shows the content of a Page
 * @param props [content, readOnly]
 * @returns {*}
 * @constructor
 */
export function PageContent(props) {
    const fileName = props.title.replace("-", " ");
    return (
        <Paper className="content-root">
            <Typography color={"inherit"} variant={"h5"}>
                {fileName}
            </Typography>
            <Typography color={"inherit"} variant={"subtitle1"} style={{display: "inline-block",marginRight: "10px"}}>
                Bearbeitet von {"Max Mustermann"} am: {"12.12.12"}
            </Typography>
            <Divider/>
            {props.readOnly ? <Markdown source={props.content}/> :
                <Editor onEdit={props.onEdit}
                        reload={props.reload}
                        closeSidebar={props.closeSidebar}
                        content={props.content}/>}
        </Paper>
    );
};