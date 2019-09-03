import React, {Component} from 'react';
import Page from "../components/Page/Page";
import './Wiki.css';

/**
 * Shows all of the Wiki Entries
 * Can create new, show or edit
 */
class Wiki extends Component {
    render() {
        return (
            <div className="base">
                <Page file={"/"} {...this.props.location}/>
            </div>
        );
    }
}

export default Wiki;
