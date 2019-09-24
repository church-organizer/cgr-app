import React from "react";
import {Dialog, DialogActions, DialogContent, DialogTitle, Slide} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Message = (props) => {
    const beginningText = props.isError ? "Es gab leider ein kleines Problem" : "";
    return (
        <Dialog open={props.open}
                TransitionComponent={Transition}
                keepMounted aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description">
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
                <p>{beginningText}</p>
                <p>{props.message}</p>
            </DialogContent>
            <DialogActions color={"primary"}>
                {props.children}
            </DialogActions>

        </Dialog>
    );
};

export default Message;
