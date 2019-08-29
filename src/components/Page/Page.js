import React, {Component} from 'react';
import TopBar from "../TopBar/TopBar";
import FileLoader from "../../services/FileLoader";
import {Content} from '../Content/Content';

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
        filename: ''
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
            <div id="page-content">
                <TopBar path={this.dir}/>
                <Content title={this.filename} content={this.state.content}/>
            </div>
        );
    }
}

export default Page;
