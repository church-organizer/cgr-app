import React, {Component} from 'react';
import WikiPage from "./WikiPage";
import './Wiki.css'

/**
 * Shows all of the Wiki Entries
 * Can create new, show or edit
 */
class Wiki extends Component {
    render() {
        return (
            <div className="base">
                <WikiPage file={"/"} {...this.props.location}/>
            </div>
        );
    }
}

export default Wiki;
