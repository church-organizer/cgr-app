import React from 'react';
import {Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles} from "@material-ui/core";
import {Link} from "react-router-dom";


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
    }
}));


const SideNav = (props) => {

    const forSideNav = (links) => (
        <div>
            <Divider/>
            <List>
                {links.map(([k, v, to]) => (
                    <ListItem button key={k} className={classes.item}>
                        <Link to={to}>
                            <ListItemIcon className="side-nav-entry">{v}</ListItemIcon>
                            <ListItemText primary={k} className="side-nav-entry"/>
                        </Link>
                    </ListItem>
                ))}
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
