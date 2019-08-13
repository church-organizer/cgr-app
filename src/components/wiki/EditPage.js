import React, {Component} from 'react';
import SideNav, {SideNavItem} from "../../tools/SideNav/SideNav";
import PageConfig from "./PageConfig";
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';

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

    render() {
        console.log('edit');
        console.log(this.props);
        return (
            <div className="test">
                <SideNav content={this.links}/>
                <PageConfig new={true} onAbort={this.props.onAbort}/>
            </div>
        );
    }
}

export default EditPage;
