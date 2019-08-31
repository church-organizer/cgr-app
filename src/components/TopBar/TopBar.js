import React from 'react';
import {Paper, Breadcrumbs, makeStyles} from "@material-ui/core";
import {Link} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const useStyle = makeStyles(theme => ({
    root: {
        height: "30px",
        padding: "10px"
    }
}));

const TopBar = (props) => {
    const classes = useStyle();
    const fillPath = () => {
        let path = "/";
        return (
            <div>
                <Grid alignItems={"stretch"} justify={"space-between"} container>
                    <Grid item xs>
                        <Breadcrumbs separator={">"} aria-label="breadcrumb">
                            <Link color="primary" to={path}>Start</Link>
                            {props.path.map((dir, index) => {
                                path += "" + dir;
                                return (<Link key={index} color="primary" to={path}>{dir}
                                </Link>);
                            })}
                        </Breadcrumbs>
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
