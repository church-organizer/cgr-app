import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const useStyle = makeStyles(theme => ({
    root: {
        position: "relative",
        bottom: 0,
        right: 0,
        height: "40px",
        borderTop: "1px solid",
        borderColor: "rgba(120,120,120,0.33)",
        backgroundColor: "white",
        marginTop: "100px",
        padding: "20px",
        zIndex: -10
    }
}));


const Footer = (props) => {
    const classes = useStyle();
    return (
        <div className={classes.root} >
            <Grid container direction={"row"} justify={"space-around"} alignItems={"center"}>
                <Grid item xs>Made with Heart</Grid>
                <Grid item xs>Footer</Grid>
            </Grid>
        </div>
    );
};

export default Footer;
