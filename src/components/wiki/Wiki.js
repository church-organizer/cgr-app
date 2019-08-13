import React, {Component} from 'react';
import WikiPage from "./WikiPage";
import './Wiki.css'
import EditPage from "./EditPage";

/**
 * Shows all of the Wiki Entries
 * Can create new, show or edit
 */
class Wiki extends Component {


    // state = {
    //     showCreate: false
    // };
    // onCreateButton = () => {
    //     console.log("create Page");
    //     this.setState({showCreate: true})
    // };

    // onAbortCreate = () => {
    //     this.setState({showCreate: false})
    // };
    //
    // onEditHandler = () => {
    //
    // };

    render() {
        return (
            <div className="base">
                {/*{this.state.showCreate ? <EditPage onAbort={this.onAbortCreate} /> :*/}
                    <WikiPage file={"/"}/>
                    {/*}*/}
            </div>
        );
    }
}

export default Wiki;
