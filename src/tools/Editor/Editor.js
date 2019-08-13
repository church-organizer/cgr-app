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
}));

const Editor = (props) => {
    const classes = useStyles();
    // man kann den editor bearbeiten ich weiß nur noch nicht wie
    let readOnly = false;
    if (props.readOnly === undefined || props.readOnly) {
        readOnly = true;
    }
    const toolbar = [
        "Heading", '|', 'bold', 'italic', '|',
        'bulletedList', 'numberedList',
        "BlockQuote", "insertTable", '|',
        "Link", "CKFinder", 'imageUpload', '|',
        'undo', 'redo',
    ];

    return (
        <div className={classes.div} id={readOnly ? "editor-content" : "editor-content-readOnly"}>
            <CKEditor editor={ClassicEditor} data={props.content}
                      config={{
                          toolbar: readOnly ? [] : toolbar,
                          table: {
                              contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
                          },
                          image: {
                              toolbar: ['imageTextAlternative', 'imageStyle:full']
                          },

                      }}
                      onInit={editor => {
                          editor.isReadOnly = readOnly;
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
