import React, {Component} from 'react';
import SideNav from "../../tools/SideNav/SideNav";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit'
import Link from "@material-ui/core/Link";
import PageConfig from "./PageConfig";

class CreatePage extends Component {
    state = {
        content: 'content',
        createFile: {
            isCreated: false,
            name: ''
        }
    };
    links = [['Seite Speichern', <AddIcon/>, "/wiki:name"], ['Abbruch', <EditIcon/>, '/wiki/']];

    constructor(props) {
        super(props);
        this.updateContent = this.updateContent.bind(this);
    }

    updateContent(newContent) {
        this.setState({
            content: newContent
        });
    }

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
                <Link to="https://github.com/ckeditor/ckeditor5-react">Beispiel Editor</Link>
                <h2>Create Page</h2>
                <PageConfig new={true} onConfirm={this.createPage}/>
                {/*<Editor onUpdate={this.updateContent}/>*/}
                {/*<button id="createButton" type="button" onClick={this.onSubmitButton}>Speichern</button>*/}
            </div>
        );
    }
}

export default CreatePage;
