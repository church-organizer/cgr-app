import React from 'react';
import {makeStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const useStyle = makeStyles(theme => ({
    root: {
        borderTop: "1px solid",
        borderColor: "rgba(120,120,120,0.33)",
        backgroundColor: "white",
        padding: "15px",
        zIndex: -10
    }
}));


const Footer = (props) => {
    const classes = useStyle();
    return (
        <div className={classes.root} >
            <Grid container direction={"row"}>
                <Grid item xs>Made with Heart</Grid>
                <Grid item xs>Footer</Grid>
            </Grid>
        </div>
    );
};

export default Footer;
