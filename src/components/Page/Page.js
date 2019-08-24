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
    state = {
        content: ''
    };

    constructor(props) {
        super(props);
        const loadDir = () => {
            this.path = window.location.pathname;
            FileLoader.getFilesFromDir(this.path).then(text => this.setState({content: text}));
        };
        loadDir();

        const path = this.path.replace("/", "");
        if (path !== "" && path !== "/") {
            this.dir = this.path.split("/");
            this.dir.shift();
        }
    }

    render() {
        return (
            <div id="page-content">
                <TopBar path={this.dir}/>
                <Content title={"hallo"} content={this.state.content}/>
            </div>
        );
    }
}

export default Page;