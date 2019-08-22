import React, {Component} from 'react';
import {Typography, Paper} from "@material-ui/core";
import Path from "../components/Path/Path";
import Editor from "../components/Editor/Editor";
import PageConfig from "./PageConfig";


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
            <Editor content={props.content} readOnly={props.readOnly}/>
        </Paper>
    );
};

/**
 * WikiPage, shows the Content of a Wikipage
 *
 */
class WikiPage extends Component {
    filename;
    content;
    dir = [];
    path;

    /**
     * readOnly is optional
     * @param props [readOnly, pathname]
     */
    constructor(props) {
        super(props);
        this.state = {
            config: {
                show: false,
                type: ''
            },
            readOnly: {
                isReadOnly: !(this.props.readOnly === false)
            }
        };

        this.path = this.props.pathname.replace("/wiki", "");
        if (this.path === "" || this.path === "/") {
            this.filename = "Startseite";
            this.content = this.pageContentInMD;
        } else {
            this.dir = this.path.split("/");
            this.dir.shift();
            this.filename = this.dir[this.dir.length - 1];
            this.content = this.pageContentInMD2;
        }
    }

    pageContentInMD = '<h1>Das ist die Startseite</h1><br><br><p>Diesen Text kann man bearbeiten</p>';
    pageContentInMD2 = `<h1> Unterseite</h1><br><br><p>Auch hier kann man den Text ändern</p>`;


    onConfigAbort = () => {
        this.setState({
            config: {
                show: false,
                type: ''
            }
        });
    };

    render() {
        return (
            <div id="page-content">
                <Path path={this.dir}/>
                <Content title={this.filename} content={this.content} readOnly={this.state.readOnly.isReadOnly}/>
                {this.state.config.show ?
                    <PageConfig new={this.state.config.type === 'create'} onAbort={this.onConfigAbort} name={this.filename}
                                path={this.path}/> : ""}
            </div>
        );

    }
}

export default WikiPage;
