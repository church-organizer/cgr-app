import React from "react";
import {Link} from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import "./SideBar.css"

/**
 * The Item component for the SideBar
 * all params are required
 * needs an icon, a text and a click method
 * @param props
 * @returns {*}
 * @constructor
 */
export const SideBarItem = (props) => {
    return (
        <Link onClick={() => props.setOpen(false)} className="sidebarLink" to={props.to}>
            <ListItem key={props.to} button>
                <ListItemText classes={{root: "fullWidth"}} style={!props.header? {marginLeft: 15}: {}}>
                    <Typography variant={props.header ? "h6" : "body1"}>
                        {props.label}
                    </Typography>
                </ListItemText>
            </ListItem>
        </Link>
    );
};

export default SideBarItem;
