import React, {Component} from 'react';
import SideNav, {SideNavItem} from "../../tools/SideNav/SideNav";
import PageConfig from "./PageConfig";
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import WikiPage from "./WikiPage";

class CreatePage extends Component {
    state = {
        content: 'content',
        createFile: {
            isCreated: false,
            name: ''
        }
    };
    links = [
        [
            <SideNavItem key={1} click="" text={"Seite Speichern"} icon={<SaveIcon/>}/>,
            <SideNavItem key={2} click="" text={"Abbrechen"} icon={<CancelIcon/>}/>
        ]
    ];

    createPage(name, path) {
        this.setState({
            createFile: {isCreated: true, name: path + name}
        });
    }


    render() {
        return (
            <div className="test">
                <SideNav content={this.links}/>
                <PageConfig new={true} create={this} onAbort={this.props.onAbort}/>
                {this.state.createFile.isCreated ? <WikiPage file={this.state.createFile.name} readOnly={false} /> : ""}
            </div>
        );
    }
}

export default CreatePage;
