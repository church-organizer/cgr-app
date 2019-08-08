import React, {Component} from 'react';
import SideNav from "../../tools/SideNav/SideNav";


class Start extends Component {
    render() {
        return (
            <div className="base">
                <SideNav content={[]}/>
                <h1>Start</h1>
                <p>Hier kommt die Startseite hin</p>
            </div>
        );
    }
}

export default Start;
