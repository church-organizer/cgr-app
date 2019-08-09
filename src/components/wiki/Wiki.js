import React, {Component} from 'react';
import WikiPage from "./WikiPage";
import SideNav, {SideNavItem} from "../../tools/SideNav/SideNav";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import './Wiki.css'
import CreatePage from "./CreatePage";

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
            <SideNavItem onClick={this.onCreateButton} text={"Neue Seite"} icon={<AddIcon/>}/>,
            <SideNavItem onClick={this.onEditHandler} text={"Seite bearbeiten"} icon={<EditIcon/>}/>
        ]
    ];



    render() {
        return (
            <div className="base">
                <SideNav content={this.links}/>
                {this.state.showCreate ? <CreatePage onAbort={this.onAbortCreate}/> : <WikiPage file={""}/>}
            </div>
        );
    }
}

export default Wiki;
