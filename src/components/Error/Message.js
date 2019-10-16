import React, {useContext} from "react";
import {Dialog, DialogActions, DialogContent, DialogTitle, Slide} from "@material-ui/core";
import StateContext from "../../contexts/StateContext";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Message = (props) => {
    const message = useContext(StateContext).message;
    const beginningText = message.isError ? "Es gab leider ein kleines Problem" : "";
    return (
        <Dialog open={message.open}
                TransitionComponent={Transition}
                keepMounted aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description">
            <DialogTitle>{message.title}</DialogTitle>
            <DialogContent>
                <p>{beginningText}</p>
                <p>{message.message}</p>
            </DialogContent>
            <DialogActions color={"primary"}>
                {message.actionButtons}
            </DialogActions>

        </Dialog>
    );
};

export default Message;
