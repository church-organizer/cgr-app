import React, {Component} from 'react';
import WikiPage from "./WikiPage";
import SideNav from "../../tools/SideNav/SideNav";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import './Wiki.css'

class Wiki extends Component {
    links = [['Neue Seite', <AddIcon/>, "/wiki/create"], ['Seite Bearbeiten', <EditIcon/>, '/wiki/:name']];

    render() {
        return (
            <div className="base">
                <SideNav content={this.links}/>
                {/*<button onClick={CreatePopup} >Button</button>*/}
                <WikiPage/>
            </div>
        );
    }
}

export default Wiki;
