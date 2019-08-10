import React, {Component} from 'react';
import SideNav, {SideNavItem} from "../../tools/SideNav/SideNav";
import Link from "@material-ui/core/Link";
import PageConfig from "./PageConfig";
import Editor from "../../tools/Editor/Editor";
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

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
            <SideNavItem onClick={this.onSaveHandler} text={"Seite Speichern"} icon={<SaveIcon/>}/>,
            <SideNavItem onClick={this.onAbortHandler} text={"Abbrechen"} icon={<CancelIcon/>}/>
        ]
    ];

    constructor(props) {
        super(props);
        this.updateContent = this.updateContent.bind(this);
    }

    updateContent(newContent) {
        this.setState({
            content: newContent
        });
    }

    onSaveHandler = () => {

    };

    onAbortHandler = () => {

    };

    createPage(name) {
        // create new page
        console.log("Success", name);
        this.setState({
            createFile: {isCreated: true, name: name}
        });
    }


    render() {
        return (
            <div className="test">
                <SideNav content={this.links}/>
                <PageConfig new={true} create={this} onAbort={this.props.onAbort}/>
                {/*{this.state.createFile.isCreated ? <Editor onUpdate={this.updateContent}/> : ""}*/}
            </div>
        );
    }
}

export default CreatePage;
