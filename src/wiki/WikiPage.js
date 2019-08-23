import React, {Component} from 'react';
import {Typography, Paper} from "@material-ui/core";
import Path from "../components/Path/Path";
import FileLoader from "../services/FileLoader";
import ReactMarkdown from "react-markdown";
import Divider from "@material-ui/core/Divider";


/**
 * Shows the content of a Page
 * @param props [content, readOnly]
 * @returns {*}
 * @constructor
 */
const Content = (props) => {
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

/**
 * WikiPage, shows the Content of a Wikipage
 *
 */
class WikiPage extends Component {
    content;
    dir = [];
    path;
    state = {
        content: ''
    };

    constructor(props) {
        super(props);
        const loadDir = () => {
            FileLoader.getFilesFromDir(window.location.pathname).then(text => this.setState({content: text}));
        };
        loadDir();
    }


    render() {
        return (
            <div id="page-content">
                <Path path={this.dir}/>
                <Content title={"hallo"} content={this.state.content}/>
            </div>
        );

    }
}

export default WikiPage;
