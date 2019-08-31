import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import Markdown from "../Content/Markdown";
import ReactDOMServer from "react-dom/server";


const useStyles = makeStyles(theme => ({
    div: {
        textAlign: "left",
        border: 'none'
    },
}));

const Editor = (props) => {
    const classes = useStyles();
    const [content, setContent] = useState(props.content);

    // passing functions into editor for extra functionality
    const extraKeys = {
        Esc: function (cm) { // todo save file here
            cm.replaceSelection(" surprise again! ");
        },
    };

    const handleChange = (value) => {
        setContent(value);
    };

    console.log(content);

    return (
        <div className={classes.root}>
            <SimpleMDE onChange={handleChange} value={content} extraKeys={extraKeys}
                       options={{
                           autofocus: true,
                           spellChecker: false,
                           previewRender(text) {
                               return ReactDOMServer.renderToString(<Markdown source={text}/>);
                           }
                       }}/>
        </div>
    );
};

export default Editor;
