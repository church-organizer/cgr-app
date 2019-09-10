import React, {Component} from 'react';
import TopBar from "../TopBar/TopBar";
import FileLoader from "../../services/FileLoader";
import {Content} from '../Content/Content';
import Fade from "@material-ui/core/Fade";

/**
 * WikiPage, shows the Content of a Wikipage
 *
 */
class Page extends Component {
    content;
    dir = [];
    path;
    filename = "Startseite";
    state = {
        content: '',
        filename: '',
        readOnly: true
    };

    constructor(props) {
        super(props);
        this.path = window.location.pathname;
        FileLoader.getPage(this.path).then(text => this.setState({content: text}));

        const path = this.path.replace("/", "");
        if (path !== "" && path !== "/") {
            this.dir = this.path.split("/");
            this.dir.shift();
            this.filename = this.dir[this.dir.length-1];
        }
    }

    render() {
        return (
            <Fade in={true} timeout={0.6}>
                <div id="page-content">
                    <TopBar onEdit={(readOnly) => this.setState({readOnly: readOnly})} path={this.dir}/>
                    <Content readOnly={this.state.readOnly} title={this.filename} content={this.state.content}/>
                </div>
            </Fade>
        );
    }
}

export default Page;
