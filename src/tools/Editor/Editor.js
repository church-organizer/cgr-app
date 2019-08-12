import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {makeStyles} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    div: {
        // paddingLeft: "250px",
        // paddingRight: "250px",
        minWidth: "500px",
        maxWidth: "1500px",
        textAlign: "left",
        border: 'none'
    },
    editor: {
        minHeight: "600px"
    }
}));

const Editor = (props) => {
    const classes = useStyles();
    // man kann den editor bearbeiten ich weiß nur noch nicht wie
    let readOnly = false;
    if (props.readOnly === undefined || props.readOnly) {
        readOnly = true;
    }
    const toolbar = !readOnly ? [
        "Heading", '|', 'bold', 'italic', '|',
        'bulletedList', 'numberedList',
        "BlockQuote", "insertTable", '|',
        "Link", "CKFinder", 'imageUpload', '|',
        'undo', 'redo',
    ]: [];

    return (
        <div className={classes.div}>
            <CKEditor className={classes.editor} editor={ClassicEditor} data={props.content}
                      config={{
                          toolbar: toolbar,
                          table: {
                              contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
                          },
                          image: {
                              toolbar: ['imageTextAlternative', 'imageStyle:full']
                          },

                      }}
                      onInit={editor => {
                          editor.isReadOnly = readOnly;
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
        </div>
    );
};

export default Editor;
