import React from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
} from "@material-ui/core";
import {Link} from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";

/**
 * Shows the Config of a Page
 * Like Name, Path, Rights
 * @param props
 * @constructor
 */
const PageConfig = (props) => {
    const [open, setOpen,] = React.useState(true);
    const [name, setName,] = React.useState(props.name ? props.name : "");
    const [path, setPath,] = React.useState(props.path ? props.path : "");



    const onChangeInputHandler = (event) => {
        if (event.target.id === 'title') {
            setName(event.target.value);
        } else if (event.target.id === 'path') {
            setPath(event.target.value);
        }
    };

    function handleAbort() {
        setOpen(false);
        props.onAbort();
    }
    console.log(props);
    return (
        <div>
            <Dialog open={open} onClose={handleAbort} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Daten</DialogTitle>
                <FormControl component={"form"}>
                    <DialogContent>
                        <DialogContentText>
                            {props.new ? "Bitte gib zuerst die Daten für deine Seite an." :
                                "Du kannst jetzt die Daten ändern"}
                        </DialogContentText>
                        <TextField
                            autoFocus margin="dense" id="title" label="Seitenname" type="text" fullWidth
                            variant={"outlined"} onChange={onChangeInputHandler}
                            required={true} value={name}
                            helperText={"Für den Namen keine Bindestriche nutzen"}
                        />
                        <TextField
                            margin="dense" id="path" label="Pfad" type="path" fullWidth
                            placeholder="/home/andererOrdner"
                            variant={"outlined"} onChange={onChangeInputHandler}
                            required={true} value={path}
                            helperText={"Mit einem '/' kannst du Unterordner erstellen"}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleAbort} color="primary">
                            Abbruch
                        </Button>
                        <Button color="primary" type={"submit"}>
                            <Link to={{pathname: '/wiki/' + path + '/' + name, readOnly: false}}>
                                {props.new ? "Erstelle die Seite" : "Speichern"}
                            </Link>
                        </Button>
                    </DialogActions>
                </FormControl>
            </Dialog>
        </div>
    );
};


export default PageConfig;
