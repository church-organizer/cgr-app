import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import Markdown from "../Content/Markdown";
import ReactDOMServer from "react-dom/server";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import FileLoader from "../../services/FileLoader";


const useStyles = makeStyles(theme => ({
    div: {
        textAlign: "left",
        border: 'none',
    },
    button: {
        marginRight: "20px"
    }
}));

const Editor = (props) => {
    const classes = useStyles();
    const [content, setContent] = useState("");

    if (content === '' && props.content !== '') {
        setContent(props.content);
    }

    // passing functions into editor for extra functionality
    const extraKeys = {
        Esc: function (cm) { // todo save file here
            cm.replaceSelection(" surprise again! ");
        },
    };

    const handleChange = (value) => {
        setContent(value);
    };

    return (
        <div className={classes.root}>
            <SimpleMDE onChange={handleChange} value={content} extraKeys={extraKeys}
                       options={{
                           placeholder: "Hier kommt der Text hin.",
                           autofocus: true,
                           spellChecker: false,
                           onToggleFullScreen(is) {
                               console.log(is);
                           },
                           previewRender(text) {
                               return ReactDOMServer.renderToString(<Markdown source={text}/>);
                           }
                       }}/>
            <Link to={window.location.pathname}>
                <Button className={classes.button} onClick={() => {
                    FileLoader.saveFile(props.fileName, content)
                }}
                        variant={"contained"} color={"primary"}>Speichern</Button>
            </Link>
            <Link to={window.location.pathname}>
                <Button className={classes.button} variant={"contained"} color={"inherit"}>Abbrechen</Button>
            </Link>
        </div>
    );
};

export default Editor;
