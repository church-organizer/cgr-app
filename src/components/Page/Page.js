import React, {Component} from 'react';
import FileLoader from "../../services/FileLoader";
import {Content} from '../Content/Content';
import Fade from "@material-ui/core/Fade";
import "./Page.css"

/**
 * WikiPage, shows the Content of a Wikipage
 *
 */
class Page extends Component {
    state = {
        content: "",
        filename: "",
        path: ""
    };

    constructor(props) {
        super(props);
    }

    /**
     * Reloads the Content of the Page if the Path changed
     */
    reload() {
        if (window.location.pathname !== this.state.path){
            let path = window.location.pathname;
            FileLoader.getPage(path).then(text => {
                path = path.split("/");
                this.setState({content: text, filename: path[path.length-1], path: window.location.pathname})
            });
        }
    }

    render() {
        this.reload();
        return (
            <Fade in={true} timeout={0.6}>
                <div id="page-content">
                    <Content readOnly={this.props.readOnly} title={this.state.filename} content={this.state.content}/>
                </div>
            </Fade>
        );
    }
}

export default Page;
