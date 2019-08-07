import React, {Component} from 'react';

class CreatePage extends Component {

    onSubmitButton = () => {
        // todo save here
        window.location.href = '/wiki'
    };


    render() {
        return (
            <div className="test">
                <h2>Create Page</h2>
                <p>Hier kommt die Create Page hin</p>
                <textarea name="content" id="editor"/>
                <button id="createButton" type="button" onClick={this.onSubmitButton}>Speichern</button>
            </div>
        );
    }
}

export default CreatePage;
