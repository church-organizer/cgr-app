import React from 'react';
import Grid from "@material-ui/core/Grid";

const Footer = () => {
    return (
        <div className="footer" >
            <Grid container direction={"row"}>
                <Grid item xs>Made with Heart</Grid>
                <Grid item xs>Footer</Grid>
            </Grid>
        </div>
    );
};

export default Footer;
