import React, {Component} from 'react';
import {Link} from "react-router-dom";
import WikiPage from "./WikiPage";
import Popup from "../../tools/Popup/popup";


class Wiki extends Component {
    render() {
        return (
            <div className="base">
                <Link to="/wiki/create" className="sub-nav-button">Create Page</Link>
                <WikiPage/>
                <Popup title="Error">Hier kommt der Text hin</Popup>
            </div>
        );
    }
}

export default Wiki;
