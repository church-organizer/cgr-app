import React from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    Paper
} from "@material-ui/core";
import Draggable from 'react-draggable'
import Link from "@material-ui/core/Link";
import FormControl from "@material-ui/core/FormControl";

/**
 * Shows the Config of a Page
 * Like Name, Path, Rights
 * @param props
 * @constructor
 */
const PageConfig = (props) => {
    const [open, setOpen,] = React.useState(true);
    const [finishedName, setName,] = React.useState('/wiki');
    let name = '';
    let path = '';

    function PaperComponent(props) {
        return (
            <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
                <Paper {...props} />
            </Draggable>
        );
    }

    const onChangeNameHandler =  (event) => {
        name = event.target.value
    };
    const onChangePathHandler =  (event) => {
        path = event.target.value
    };

    function handleAbort() {
        setOpen(false);
        props.onAbort();
    }

    function handleConfirm(evt) {
        setOpen(false);
        setName(path + name);
        props.create.createPage(name, path)
    }

    return (
        <div>
            <Dialog open={open} onClose={handleAbort} aria-labelledby="form-dialog-title"
                    PaperComponent={PaperComponent}>
                <DialogTitle id="form-dialog-title" style={{cursor: 'move'}}>Daten</DialogTitle>
                <FormControl >
                    <DialogContent>
                        <DialogContentText>
                            {props.new ? "Bitte gib zuerst die Daten für deine Seite an." :
                                "Du kannst jetzt die Daten ändern"}

                        </DialogContentText>
                        <TextField
                            autoFocus margin="dense" id="title" label="Seitenname" type="text" fullWidth
                            variant={"outlined"} onChange={onChangeNameHandler}/>
                        <TextField
                            margin="dense" id="path" label="Pfad" type="path" fullWidth placeholder="/home/andererOrdner"
                            variant={"outlined"} onChange={onChangePathHandler}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleAbort} color="primary">
                            Abbruch
                        </Button>
                        <Link to={finishedName}>
                            <Button onClick={handleConfirm} color="primary">
                                {props.new ? "Erstelle die Seite" : "Speichern"}
                            </Button>
                        </Link>
                    </DialogActions>
                </FormControl>
            </Dialog>
        </div>
    );
};


export default PageConfig;
