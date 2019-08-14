import React from 'react';
import {
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemIcon, ListItemText,
    makeStyles,
} from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import clsx from 'clsx';
import useMediaQuery from '@material-ui/core/useMediaQuery';


const initWidth = 200;

const useStyles = makeStyles(theme => ({
    drawerPaper: {
        width: initWidth,
        paddingLeft: "10px",
        paddingRight: "10px",
    },
    toolbar: theme.mixins.toolbar,
    item: {
        paddingLeft: 0,
        paddingRight: 0,
        display: "block",
        borderRadius: '2px'
    },
    button: {
        width: "calc(100% - 12px)",
        height: "100%",
        paddingLeft: "12px",
        paddingTop: "10px"
    },
    drawer: {
        width: initWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    icon: {
        display: "inline",
        padding: "4px",
        margin: "5px"
    },
    itemText: {
        display: "inline",
        position: "relative",
        left: "0px",
        bottom: 5

    },
    drawerOpen: {
        width: initWidth,
        top: "66px",
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        top: "66px",
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7)
    },
}));
/**
 * The Item component for the Sidebar
 * all params are required
 * needs an icon, a text and a click method
 * @param props
 * @returns {*}
 * @constructor
 */
export const SideNavItem = (props) => {
    const classes = useStyles();
    return (
        <ListItem key={props.text.replace(" ", "")} button className={classes.item} onClick={props.click}>
            <div className={classes.button}>
                <ListItemIcon >{props.icon}</ListItemIcon>
                <ListItemText className={classes.itemText} primary={props.text}/>
            </div>
        </ListItem>
    );
};

const SideNav = (props) => {
    const matches = useMediaQuery('(min-width:1100px)');
    /**
     * Todo Dirty Hack fixen. das geht sicherlich auch noch schöner
     */
    const onHomeButton = () => {
        document.getElementById("homeButton").click();
    };

    const forSideNav = (links) => (
        <div>
            <SideNavItem click={onHomeButton} text={"Startseite"} icon={<HomeIcon/>}/>
            <Divider/>
            <List>
                {links.map(item => item)}
            </List>
            <Divider/>
        </div>
    );



    const classes = useStyles();
    return (
        <Drawer open={matches} className={
            clsx(classes.drawer, {
                [classes.drawerOpen]: matches,
                [classes.drawerClose]: !matches,
            })} variant={"permanent"} anchor={"left"} classes={{
            paper: clsx({
                [classes.drawerOpen]: matches,
                [classes.drawerClose]: !matches,
            })
        }}>
            {forSideNav(props.content)}
        </Drawer>
    );
};

export default SideNav;
