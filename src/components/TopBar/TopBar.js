import React, {useState} from 'react';
import {Paper, makeStyles} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';
import Grid from "@material-ui/core/Grid";
import Path from "./Path";
import IconButton from "@material-ui/core/IconButton";

const useStyle = makeStyles(theme => ({
    root: {
        height: "30px",
        padding: "10px"
    },
    rotate: {
        '&:focus':{
            animation: "rotate-center 0.6s ease-in-out both"
        }
    },
    rotateLeft: {
        '&:focus':{
            animation: "rotate-in-center 0.6s cubic-bezier(0.940, 0.450, 0.460, 0.250) both"
        }
    }
}));

const TopBar = (props) => {
    const classes = useStyle();
    const [edit, setEdit] = useState(false);
    const fillPath = () => {
        return (
            <div>
                <Grid alignItems={"center"} justify={"space-between"} container>
                    <Grid item xs={9}>
                        <Path folder={props.path}/>
                    </Grid>
                    <Grid item xs={3}>
                        <IconButton className={edit? classes.rotate : classes.rotateLeft} onClick={()=> {props.onEdit(edit); setEdit(!edit)}} variant={"contained"} color={edit? "secondary": "primary"} style={{float: "right"}}>
                            {!edit ? <EditIcon fontSize={"large"}/> :
                                <ClearIcon fontSize={"large"}/>}
                        </IconButton>
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
