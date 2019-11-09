import React, {useContext, useState} from 'react';
import {Paper, makeStyles} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';
import Grid from "@material-ui/core/Grid";
import Path from "./Path";
import IconButton from "@material-ui/core/IconButton";
import StateContext from "../../contexts/StateContext";
import Login from './Login';

const useStyle = makeStyles(theme => ({
    root: {
        height: "30px",
        paddingLeft: "10px",
        paddingBottom: "5px"
    },
    rotate: {
        '&:focus': {
            animation: "rotate-center 0.6s ease-in-out both"
        }
    },
    rotateLeft: {
        '&:focus': {
            animation: "rotate-in-center 0.6s cubic-bezier(0.940, 0.450, 0.460, 0.250) both"
        }
    }
}));

const TopBar = (props) => {
    const classes = useStyle();
    const [dir, setDir] = useState({dir: [], path: ""});
    const edit = !useContext(StateContext).page.readOnly;
    const loginState = useContext(StateContext).login;

    function reload() {
        if (dir.path !== window.location.pathname) {
            const path = window.location.pathname.slice(1).replace(/%20/g, " ");
            console.log(path);
            if (path !== "" && path !== "/") {
                setDir({dir: path.split("/"), path: window.location.pathname});
            } else {
                setDir({dir: [], path: window.location.pathname});
            }
        }
    }

    /**
     * Checks if the shown content is editable
     * @returns {boolean}
     */
    const allowEditContent = () => {
        return !(dir.dir.length === 1);
    };

    reload();

    const fillPath = () => {
        return (
            <div>
                <Grid alignItems={"center"} justify={"space-between"} container>
                    <Grid item xs={9}>
                        <Path folder={dir.dir}/>
                    </Grid>
                    { loginState.isLoggedIn &&
                    <Grid item xs={1}>
                        <IconButton 
                                    className={edit ? classes.rotate : classes.rotateLeft}
                                    onClick={() => {
                                        props.onClick(edit)
                                    }}
                                    variant={"contained"}
                                    color={edit ? "secondary" : "primary"}
                                    style={{float: "right"}}>
                            {!edit ? <EditIcon fontSize={"inherit"}/> :
                                <ClearIcon fontSize={"inherit"}/>}
                        </IconButton>
                    </Grid> }
                    <Grid item xs={1}>
                        <Login></Login>
                    </Grid>
                </Grid>
            </div>
        );
    };

    return (
        <Paper className={classes.root} elevation={0}>
            {fillPath()}
        </Paper>
    );
};

export default TopBar;
