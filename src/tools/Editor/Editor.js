import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {makeStyles} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    div: {
        paddingLeft: "250px",
        paddingRight: "250px",
        minWidth: "500px",
        maxWidth: "1500px",
        textAlign: "left"
    },
    editor: {
        minHeight: "600px"
    }
}));

const Editor = (props) => {
    const classes = useStyles();
    // man kann den editor bearbeiten ich weiß nur noch nicht wie
    // const toolbar = ['bold', 'italic', "BlockQuote", "CKFinder", "EasyImage", "Heading", "Heading", "Image"];
    // ClassicEditor.create(document.querySelector('#editor'), {
    //     toolbar: toolbar
    // })
    //     .catch(error => {
    //         console.error(error);
    //         return <p>eroor</p>;
    //     });

    return (
        <div className={classes.div}>
            <CKEditor className={classes.editor} editor={ClassicEditor}
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
