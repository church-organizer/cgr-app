import React from 'react';
import {Paper, Breadcrumbs, makeStyles} from "@material-ui/core";
import {Link} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Path from "./Path";

const useStyle = makeStyles(theme => ({
    root: {
        height: "30px",
        padding: "10px"
    }
}));

const TopBar = (props) => {
    const classes = useStyle();
    const fillPath = () => {
        return (
            <div>
                <Grid alignItems={"stretch"} justify={"space-between"} container>
                    <Grid item xs>
                        <Path folder={props.path}/>
                    </Grid>
                    <Grid item xs>
                        <Button onClick={() => props.onEdit(false)} variant={"contained"} color={"inherit"} style={{float: "right"}}>Bearbeiten</Button>
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
