import React, {Component} from 'react';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import Markdown from "../Page/Markdown";
import ReactDOMServer from "react-dom/server";
import Button from "@material-ui/core/Button";
import FileLoader from "../../services/FileLoader";
import ClearIcon from '@material-ui/icons/Clear';
import SaveIcon from '@material-ui/icons/Save';
import Fade from "@material-ui/core/Fade";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import "./Editor.css"


class Editor extends Component {
    state = {
        content: this.props.content,
        loading: false,
        position: {line: 0, row: 0},
        changeContent: {await: false, replaceLength: 0},
        newImageList: []
    };

    // passing functions into editor for extra functionality
    extraKeys = {
        Esc: function (cm) { // todo save file here
            cm.replaceSelection(" surprise again! ");
        },
    };

    /**
     * Called on content changed
     * If there is content to be changed (e.g)
     * @param value
     */
    handleChange = (value) => {
        this.setState({content: value});
        if (this.state.changeContent.await) {
            this.changeContentAtPosition(this.state.position, this.state.changeContent.replaceLength);
            this.setState({changeContent: {await: false, replaceLength: 0}});
        }

    };

    /**
     * saves the content and makes it readonly again
     */
    onSaveClick = () => {
        this.props.onEdit(true);
        this.setState({loading: true});
        FileLoader.saveFile(window.location.pathname, this.state.content).then((result) => {
            this.props.reload();
            this.setState({loading: false});
        });
        if (this.state.newImageList.length >0){
            for(let image of this.state.newImageList){
                FileLoader.uploadImage(image).then(res => console.log(res)).catch(err => console.error(err));
            }
        }
        this.setState({newImageList: []});
        this.props.onEdit(true);

    };

    /**
     * adds the click event to the image button of the editor
     */
    addClickEventToExistingButton() {
        const button = document.getElementsByClassName("image")[0];
        const fileUpload = document.getElementById("uploadImage");
        fileUpload.addEventListener("change", () => this.addToImageList());
        button.addEventListener("click", () => this.uploadImage());
    };

    addToImageList(){
        const list = this.state.newImageList;
        list.push(document.getElementById("uploadImage").files[0]);
        console.log(list);
        this.setState({newImageList: list});
    }

    /**
     * calls the api to upload the image
     * and sets the state so when the editor adds the image part in the md content it removes the next 8 chars
     * after the cursor
     */
    uploadImage() {
        document.getElementById("uploadImage").click();
        this.setState({changeContent: {await: true, replaceLength: 8}});
    };

    /**
     * changes the to content and cuts the next chars (depending on the length param) and
     * replaces it with the param replaceText
     * @param position the start position from where to cut
     * @param length how many chars will be cut
     * @param replaceText the text to be insert
     */
    changeContentAtPosition(position, length = 0, replaceText = "") {
        const index = this.positionToIndex(position);
        const tempContent = this.state.content.slice(0, index) + replaceText + this.state.content.slice(index + length, this.state.content.length);
        this.setState({content: tempContent});
    };

    /**
     * Returns the Index of the Cursor position
     * @param position
     * @returns {number} the index in the content
     */
    positionToIndex = (position) => {
        let counter = 0;
        const lines = this.state.content.split("\n");
        for (let i = 0; i < position.line && i < lines.length; i++) {
            counter += lines[i].length;
        }
        return counter + position.row;
    };

    render() {
        return (
            <div>
                <Fade in={this.state.loading}>
                    <div>
                        <CircularProgress className="loading" size={70}/>
                    </div>
                </Fade>
                <input style={{display: "none"}} id="uploadImage" type="file"
                       accept="image/gif,image/jpeg,image/jpg,image/png"/>
                <SimpleMDE onChange={this.handleChange} value={this.state.content} extraKeys={this.extraKeys}
                           getLineAndCursor={pPosition => this.setState({
                               position: {
                                   line: pPosition.line,
                                   row: pPosition.ch
                               }
                           })}
                           getMdeInstance={instance => {
                               this.addClickEventToExistingButton();
                           }}
                           options={{
                               placeholder: "Hier kommt der Text hin.",
                               autofocus: true,
                               spellChecker: false,
                               onToggleFullScreen(is) {
                                   this.props.closeSidebar(!is);
                               },
                               previewRender(text) {
                                   return ReactDOMServer.renderToString(<Markdown source={text}/>);
                               }
                           }}/>
                <Button className="editorButton"
                        onClick={this.onSaveClick}
                        variant={"contained"}
                        color={"primary"}>
                    <SaveIcon className=""/>Speichern
                </Button>
                <Button onClick={() => this.props.onEdit(true)} className="editorButton" variant={"contained"}
                        color={"inherit"}>
                    <ClearIcon className=""/>Abbrechen
                </Button>
            </div>
        );
    }
}

export default Editor;
