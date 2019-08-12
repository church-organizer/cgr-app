import React, {Component} from 'react';
import WikiPage from "./WikiPage";
import SideNav, {SideNavItem} from "../../tools/SideNav/SideNav";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import './Wiki.css'
import EditPage from "./EditPage";

/**
 * Shows all of the Wiki Entries
 * Can create new, show or edit
 */
class Wiki extends Component {


    state = {
        showCreate: false
    };
    onCreateButton = () => {
        console.log("create Page");
        this.setState({showCreate: true})
    };

    onAbortCreate = () => {
        this.setState({showCreate: false})
    };

    onEditHandler = () => {

    };

    links = [
        [
            <SideNavItem key={1} click={this.onCreateButton} text={"Neue Seite"} icon={<AddIcon/>}/>,
            <SideNavItem key={2} click={this.onEditHandler} text={"Seite bearbeiten"} icon={<EditIcon/>}/>
        ]
    ];


    render() {
        return (
            <div className="base">
                <SideNav content={this.links}/>
                {this.state.showCreate ? <EditPage onAbort={this.onAbortCreate}/> : <WikiPage file={"/"}/>}
            </div>
        );
    }
}

export default Wiki;
