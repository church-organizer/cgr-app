import React, {Component} from 'react';
import FileLoader from "../../services/FileLoader";
import {PageContent} from './PageContent';
import Fade from "@material-ui/core/Fade";
import "./Page.css"
import changeContentIfMatch from "../../services/SearchContent";

/**
 * WikiPage, shows the PageContent of a Wikipage
 *
 */
class Page extends Component {
    path = "";
    state = {
        content: "",
        originContent: "",
        filename: "",
        search: this.getDataFromSearchbar()
    };

    constructor(props) {
        super(props);
    }

    /**
     * Reloads the PageContent of the Page if the Path changed
     */
    reload(force=false) {
        if (window.location.pathname !== this.path || force){
            this.path = window.location.pathname;
            let path = window.location.pathname;
            FileLoader.getPage(path).then(text => {
                path = path.split("/");
                const content = changeContentIfMatch(text, this.state.search);
                this.setState({content: content, filename: path[path.length-1], originContent:text})
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

    getContent(){
        return this.props.readOnly ? this.state.content : this.state.originContent;
    }

    render() {
        this.reload();


        return (
            <Fade in={true} timeout={0.6}>
                <div id="page-content">
                    <PageContent closeSidebar={this.props.closeSidebar}
                                 reload={()=> {this.reload(true)}}
                                 readOnly={this.props.readOnly}
                                 title={this.state.filename}
                                 content={this.getContent()}
                                 onEdit={this.props.onEdit}
                    />
                </div>
            </Fade>
        );
    }
}

export default Page;
