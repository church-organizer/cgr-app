import React, {Component} from 'react';
import SideNav from "../../tools/SideNav/SideNav";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit'
import Editor from '../../tools/Editor/Editor'
import Link from "@material-ui/core/Link";

class CreatePage extends Component {
    links = [['Seite Speichern', <AddIcon/>, "/wiki/create"], ['Abbruch', <EditIcon/>, '/wiki/:name']];

    constructor(props) {
        super(props);
        this.updateContent = this.updateContent.bind(this);
        this.state = {
            content: 'content',
        }
    }

    updateContent(newContent) {
        this.setState({
            content: newContent
        })
    }


    render() {
        return (
            <div className="test">
                <SideNav content={this.links}/>
                <Link to="https://github.com/codeslayer1/react-ckeditor">Beispiel Editor</Link>
                <h2>Create Page</h2>
                <Editor onUpdate={this.updateContent}/>
                <button id="createButton" type="button" onClick={this.onSubmitButton}>Speichern</button>
            </div>
        );
    }
}

export default CreatePage;
