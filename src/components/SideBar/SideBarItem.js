import React from "react";
import {Link} from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    fullWidth: {
        width: "100%",
    },
    link: {
        width: "max-content",
        color: "white",
        '&:hover': {
            opacity: "0.7",
        }
    },
}));

/**
 * The Item component for the SideBar
 * all params are required
 * needs an icon, a text and a click method
 * @param props
 * @returns {*}
 * @constructor
 */
export const SideBarItem = (props) => {
    const classes = useStyles();
    return (
        <Link onClick={() => props.setOpen(false)} className={classes.link} to={props.to}>
            <ListItem key={props.to} button>
                <ListItemText classes={{root: classes.fullWidth}} style={!props.header? {marginLeft: 15}: {}}>
                    <Typography variant={props.header ? "h6" : "body1"}>
                        {props.label}
                    </Typography>
                </ListItemText>
            </ListItem>
        </Link>
    );
};

export default SideBarItem;
