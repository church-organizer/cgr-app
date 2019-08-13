import React, {Component} from 'react';
import PageConfig from "./PageConfig";

class EditPage extends Component {
    state = {
        content: 'content',
        createFile: {
            isCreated: false,
            name: ''
        }
    };

    render() {
        return (
            <div className="test">
                <PageConfig new={true} onAbort={this.props.onAbort}/>
            </div>
        );
    }
}

export default EditPage;
