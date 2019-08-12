import React, {Component} from 'react';
import SideNav, {SideNavItem} from "../../tools/SideNav/SideNav";
import PageConfig from "./PageConfig";
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
import WikiPage from "./WikiPage";

class EditPage extends Component {
    state = {
        content: 'content',
        createFile: {
            isCreated: false,
            name: ''
        }
    };

    /**
     * todo links working correct
     * todo login window
     *
     * @type {*[][]}
     */
    links = [
        [
            <SideNavItem key={1} text={"Seite Speichern"} icon={<SaveIcon/>}/>,
            <SideNavItem key={2} text={"Seite löschen"} icon={<DeleteIcon/>}/>,
            <SideNavItem key={3} text={"Abbrechen"} icon={<CancelIcon/>}/>
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

export default EditPage;
