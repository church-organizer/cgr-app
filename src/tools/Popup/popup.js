import React, {Component} from 'react';
import './popup.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faTimes
} from '@fortawesome/free-solid-svg-icons'

class Popup extends Component {
    render() {
        return (
            <div id="popup">
                <h1 id="popup-title">{this.props.title}</h1>
                <FontAwesomeIcon icon={faTimes} size="1x" id="close-icon"/>
                <div>
                    <p id="popup-content">{this.props.children}</p>
                </div>
            </div>
        );
    }
}

export default Popup;
