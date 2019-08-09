import React from 'react';
import {
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Typography,
    Button, Portal
} from "@material-ui/core";
import {Link} from "react-router-dom";
import Icon from "@material-ui/core/Icon";


const useStyles = makeStyles(theme => ({
    drawerPaper: {
        width: "200px",
        top: "64px",
        paddingLeft: "10px",
        paddingRight: "10px",
    },
    toolbar: theme.mixins.toolbar,
    item: {
        paddingLeft: 0,
        paddingRight: 0,
        display: "inline-block"
    },
    button: {
        width: "100%",
        height: "100%"
    }
}));
export const SideNavItem = (props) => {
    const classes = useStyles();
    const show = false;
    return (
        <ListItem key={props.text} button className={classes.item} onClick={props.onClick} >
            <Link component="button" classes={classes.button}>
                <ListItemIcon className="side-nav-entry">{props.icon}</ListItemIcon>
                <Typography className="side-nav-entry">{props.text}</Typography>
            </Link>
        </ListItem>
    );
};

const SideNav = (props) => {

    const forSideNav = (links) => (
        <div>
            <Divider/>
            <List>
                {links.map(item => item)}
            </List>
            <Divider/>
        </div>
    );


    const classes = useStyles();
    return (
        <Drawer variant={"permanent"} anchor={"left"} classes={{paper: classes.drawerPaper,}}>
            {forSideNav(props.content)}
        </Drawer>
    );
};

export default SideNav;
