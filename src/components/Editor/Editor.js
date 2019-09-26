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
import EditorHelp from "./EditorHelp";


class Editor extends Component {
    state = {
        content: this.props.content,
        loading: false,
        position: {line: 0, row: 0},
        newImageList: [],
        openHelp: false
    };

    // passing functions into editor for extra functionality
    extraKeys = {
        Esc: function (cm) { // todo save file here
            cm.replaceSelection(" surprise again! ");
        },
    };

    /**
     * Called on content changed
     * If there is content to be changed
     * @param value
     */
    handleChange = (value) => {
        this.setState({content: value});
    };

    /**
     * saves the content and makes it readonly again
     */
    onSaveClick = () => {
        this.setState({loading: true});
        FileLoader.saveFile(window.location.pathname, this.state.content).then((result) => {
            if (this.state.newImageList.length === 0) {
                this.props.reload();
                this.setState({loading: false});
            }
        });
        if (this.state.newImageList.length > 0) {
            const list = this.state.newImageList;
            for (let i = 0; i < list.length; i++) {
                // when the last one is ready, its finished loading
                const isLast = i === list.length - 1;
                FileLoader.uploadImage(list[i]).then(() => {
                    if (isLast) {
                        this.props.reload();
                        this.setState({loading: false});
                    }
                }).catch(err => console.error(err));
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
        button.addEventListener("click", () => this.openImageSelect());
        this.removeDefaultHelpButtonFromEditor();
    };

    /**
     * Makes some js foo
     * gets the help help button, creates a new with the same atributes
     * and adds a new event for 'click'
     * the new replaces the old one
     */
    removeDefaultHelpButtonFromEditor(){
        const toolbar = document.getElementsByClassName("editor-toolbar")[0];
        const helpButton = document.getElementsByClassName("guide")[0];
        const newHelpButton = document.createElement(helpButton.tagName);
        newHelpButton.className = helpButton.className;
        newHelpButton.type = helpButton.type;
        newHelpButton.title = helpButton.title;
        newHelpButton.addEventListener("click", ()=> this.changeStateOpenHelpForMarkdownContent(true));
        for(let node of helpButton.childNodes){
            newHelpButton.appendChild(node);
        }
        toolbar.replaceChild(newHelpButton, helpButton);
    }

    /**
     * opens the help for the Markdown content
     */
    changeStateOpenHelpForMarkdownContent(open){
        this.setState({openHelp: open});
    }

    /**
     * adds the selected Image to the image list
     * the image list will be uploaded when the page is saved
     */
    addToImageList(){
        const list = this.state.newImageList;
        const image = document.getElementById("uploadImage").files[0];
        list.push(image);
        this.setState({
            newImageList: list,
            content: this.changeContentAtPosition(this.state.position,8, image.name),
        });
    }

    /**
     * calls the api to upload the image
     * and sets the state so when the editor adds the image part in the md content it removes the next 8 chars
     * after the cursor
     */
    openImageSelect() {
        document.getElementById("uploadImage").click();
    };

    /**
     * changes the to content and cuts the next chars (depending on the length param) and
     * replaces it with the param replaceText
     * todo the cursor jumps to the start after selecting one image, has to be fixed
     * @param position the start position from where to cut
     * @param length how many chars will be cut
     * @param replaceText the text to be insert
     * @return the changed content
     */
    changeContentAtPosition(position, length = 0, replaceText = "") {
        const index = this.positionToIndex(position);
        return this.state.content.slice(0, index) + replaceText + this.state.content.slice(index + length, this.state.content.length);
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
            counter += lines[i].length + 1; // plus one for every linebreak
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
                <EditorHelp open={this.state.openHelp} onClose={()=> this.changeStateOpenHelpForMarkdownContent(false)}/>
                <input style={{display: "none"}} id="uploadImage" type="file" name="file"
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
                               onToggleFullScreen: (is)=> {this.props.closeSidebar(!is)},
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
