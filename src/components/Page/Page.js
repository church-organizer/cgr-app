import React, {Component} from 'react';
import FileLoader from "../../services/FileLoader";
import {Content} from '../Content/Content';
import Fade from "@material-ui/core/Fade";
import "./Page.css"
import changeContentIfMatch from "../../services/SearchContent";

/**
 * WikiPage, shows the Content of a Wikipage
 *
 */
class Page extends Component {
    path = "";
    state = {
        content: "",
        filename: "",
        search: this.getDataFromSearchbar()
    };

    constructor(props) {
        super(props);
    }

    /**
     * Reloads the Content of the Page if the Path changed
     */
    reload() {
        if (window.location.pathname !== this.path ){
            this.path = window.location.pathname;
            let path = window.location.pathname;
            FileLoader.getPage(path).then(text => {
                path = path.split("/");
                const content = changeContentIfMatch(text, this.state.search);
                this.setState({content: content, filename: path[path.length-1]})
            });
        }
    }

    getDataFromSearchbar() {
        if (window.location.search) {
            let search = window.location.search.slice(1);
            let values = search.split("&")[0].split("=");
            if(values[0] === "search") {
                return values[1];
            }
        }
        return "";
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
