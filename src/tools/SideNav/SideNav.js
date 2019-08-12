import React from 'react';
import {
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    makeStyles,
    Typography,
} from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';


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
        display: "inline-block",
        borderRadius: '2px'
    },
    button: {
        width: "100%",
        height: "100%"
    }
}));
export const SideNavItem = (props) => {
    const classes = useStyles();
    return (
        <ListItem key={props.text.replace(" ", "")} button className={classes.item} onClick={props.click} >
            <div  className={classes.button}>
                <ListItemIcon className="side-nav-entry">{props.icon}</ListItemIcon>
                <Typography className="side-nav-entry">{props.text}</Typography>
            </div>
        </ListItem>
    );
};

const SideNav = (props) => {

    const forSideNav = (links) => (
        <div>
            <SideNavItem onClick={""} text={"Startseite"} icon={<HomeIcon/>}/>
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
