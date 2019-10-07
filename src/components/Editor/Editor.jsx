import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core";
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


const useStyles = makeStyles(theme => ({
    div: {
        textAlign: "left",
        border: 'none',
    },
    button: {
        marginRight: "20px"
    },
    icon: {
        marginRight: theme.spacing(1),
    }
}));

const Editor = (props) => {
    const classes = useStyles();
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    if (content === '' && props.content !== '') {
        setContent(props.content);
    }

    // passing functions into editor for extra functionality
    const extraKeys = {
        Esc: function (cm) { // todo save file here
            cm.replaceSelection(" surprise again! ");
        },
    };

    /**
     * Called on content changed
     * @param value
     */
    const handleChange = (value) => {
        setContent(value);
    };

    const onSaveClick= () => {
        props.onEdit(true);
        setLoading(true);
        FileLoader.saveFile(window.location.pathname, content).then((result) => {
            props.reload();
            setLoading(false)
        });
    };

    return (
        <div className={classes.root}>
            <Fade in={loading}>
                <div>
                    <CircularProgress className="loading" size={70}/>
                </div>
            </Fade>

            <SimpleMDE onChange={handleChange} value={content} extraKeys={extraKeys}
                       options={{
                           placeholder: "Hier kommt der Text hin.",
                           autofocus: true,
                           spellChecker: false,
                           onToggleFullScreen(is) {
                               props.closeSidebar(!is);
                           },
                           previewRender(text) {
                               return ReactDOMServer.renderToString(<Markdown source={text}/>);
                           }
                       }}/>
            <Button className={classes.button}
                    onClick={onSaveClick}
                    variant={"contained"}
                    color={"primary"}>
                <SaveIcon className={classes.icon}/>Speichern
            </Button>
            <Button onClick={() => props.onEdit(true)} className={classes.button} variant={"contained"}
                    color={"inherit"}>
                <ClearIcon className={classes.icon}/>Abbrechen
            </Button>
        </div>
    );
};

export default Editor;
