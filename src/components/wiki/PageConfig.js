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
import FormControl from "@material-ui/core/FormControl";

/**
 * Shows the Config of a Page
 * Like Name, Path, Rights
 * @param props
 * @constructor
 */
const PageConfig = (props) => {
    const [open, setOpen] = React.useState(true);

    function PaperComponent(props) {
        return (
            <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
                <Paper {...props} />
            </Draggable>
        );
    }

    function handleAbort() {
        setOpen(false);
        window.history.back()
    }

    function handleConfirm(evt) {
        console.log(evt.tartget.value);
        setOpen(false);
        (props.onConfirm)();
    }

    return (
        <div>
            <Dialog open={open} onClose={handleAbort} aria-labelledby="form-dialog-title"
                    PaperComponent={PaperComponent}>
                <DialogTitle id="form-dialog-title" style={{cursor: 'move'}}>Daten</DialogTitle>
                <FormControl>
                    <DialogContent>
                        <DialogContentText>
                            {props.new ? "Bitte gib zuerst die Daten für deine Seite an." :
                                "Du kannst jetzt die Daten ändern"}

                        </DialogContentText>
                        <TextField
                            autoFocus margin="dense" id="title" label="Seitenname" type="email" fullWidth
                            variant={"outlined"}/>
                        <TextField
                            margin="dense" id="path" label="Pfad" type="path" fullWidth placeholder="/"
                            variant={"outlined"}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleAbort} color="primary">
                            Abbruch
                        </Button>
                        <Button type="submit" onClick={handleConfirm} color="primary">
                            {props.new ? "Erstelle die Seite" : "Speichern"}
                        </Button>
                    </DialogActions>
                </FormControl>
            </Dialog>
        </div>
    );
};


export default PageConfig;