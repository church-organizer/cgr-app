import React, {useContext} from 'react';
import {Typography, Paper} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Markdown from "./Markdown";
import Editor from "../Editor/Editor";
import "./PageContent.css"
import StateContext from "../../contexts/StateContext";

/**
 * Shows the content of a Page
 * @param props [content, readOnly]
 * @returns {*}
 * @constructor
 */
export function PageContent(props) {
    const fileName = props.title.replace("-", " ");
    const page = useContext(StateContext).page;
    return (
        <Paper className="content-root">
            <Typography color={"inherit"} variant={"h5"}>
                {fileName}
            </Typography>
            <Typography color={"inherit"} variant={"subtitle1"} style={{display: "inline-block",marginRight: "10px"}}>
                Bearbeitet von {"Max Mustermann"} am: {"12.12.12"}
            </Typography>
            <Divider/>
            {page.readOnly ? <Markdown source={props.content}/> :
                <Editor reload={props.reload} content={props.content}/>}
        </Paper>
    );
}
