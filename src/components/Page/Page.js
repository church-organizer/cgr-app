import React, {Component} from 'react';
import FileLoader from "../../services/FileLoader";
import {Content} from '../Content/Content';
import Fade from "@material-ui/core/Fade";

/**
 * WikiPage, shows the Content of a Wikipage
 *
 */
class Page extends Component {
    state = {
        content: ''
    };

    constructor(props) {
        super(props);
        FileLoader.getPage(props.path).then(text => this.setState({content: text}));
    }

    render() {
        return (
            <Fade in={true} timeout={0.6}>
                <div id="page-content" style={{minHeight : "calc(100vh - 110px)"}}>
                    <Content readOnly={this.props.readOnly} title={this.props.filename} content={this.state.content}/>
                </div>
            </Fade>
        );
    }
}

export default Page;
