import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {makeStyles} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    editor: {
        paddingLeft: "250px",
        paddingRight: "250px",
        minWidth: "500px",
        maxWidth: "1500px"
    }
}));

const Editor = (props) => {
    const classes = useStyles();


    return (
        <div className={classes.editor}>
            <CKEditor editor={ClassicEditor} data="<p>hallo</p>"
                      onInit={editor => {
                          // You can store the "editor" and use when it is needed.
                          console.log('Editor is ready to use!', editor);
                      }}
                      onChange={(event, editor) => {
                          const data = editor.getData();
                          console.log({event, editor, data});
                      }}
                      onBlur={editor => {
                          console.log('Blur.', editor);
                      }}
                      onFocus={editor => {
                          console.log('Focus.', editor);
                      }}/>
            {/*<CKEditor  activeClass="editor" content={""} onChange={props.onUpdate} />*/}
        </div>
    );
};

export default Editor;
