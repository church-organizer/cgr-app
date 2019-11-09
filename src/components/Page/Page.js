import React, {Component} from 'react';
import FileLoader from "../../services/FileLoader";
import {PageContent} from './PageContent';
import Fade from "@material-ui/core/Fade";
import "./Page.css"
import StateContext from "../../contexts/StateContext";
import {getArticleByFilter} from "../../services/strapi.service";
import Button from "@material-ui/core/Button";

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
    };
    static contextType = StateContext;

    /**
     * Reloads the PageContent of the Page if the Path changed
     */
    reload(force = false) {
        if (window.location.pathname !== this.path || force) {
            this.path = window.location.pathname;
            let path = window.location.pathname;
            path = path.split("/");
            getArticleByFilter(`title=${path[path.length - 1]}&articlepath.path=${path[path.length - 2].toLowerCase()}`).then(res => {
                if (res.data.length > 0) {
                    const text = res.data[0].content;
                    // const content = changeContentIfMatch(text, this.context.search.content);
                    this.setState({content: text, filename: res.data[0].title, originContent: text});
                } else {
                    this.context.message.changeMessageState(true,
                        "",
                        "Es gibt keinen passenden Eintrag",
                        [<Button onClick={() =>{window.history.back(); this.context.message.close()}} color={"primary"}>Zurück</Button>,
                            <Button color={"primary"} onClick={() => this.context.message.close()}>Schließen</Button>],
                        true
                    );
                }
            });
        }
    }

    // getDataFromSearchbar() {
    //     if (window.location.search) {
    //         let search = window.location.search.slice(1);
    //         let values = search.split("&")[0].split("=");
    //         if (values[0] === "search") {
    //             return values[1];
    //         }
    //     }
    //     return "";
    // }

    getContent() {
        return this.context.page.readOnly ? this.state.content : this.state.originContent;
    }

    render() {
        this.reload();
        return (
            <Fade in={true} timeout={0.6}>
                <div id="page-content">
                    <PageContent reload={() => this.reload(true)} title={this.state.filename}
                                 content={this.getContent()}
                    />
                </div>
            </Fade>
        );
    }
}

export default Page;
