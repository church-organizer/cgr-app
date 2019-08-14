import React from 'react';
import {
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemIcon, ListItemText,
    makeStyles,
    Typography,
} from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import clsx from 'clsx';
import useMediaQuery from '@material-ui/core/useMediaQuery';


const useStyles = makeStyles(theme => ({
    drawerPaper: {
        width: "200px",
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
    },
    drawer: {
        width: "200px",
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: "200px",
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
        width: theme.spacing(7) + 1
    },
}));
export const SideNavItem = (props) => {
    const classes = useStyles();
    return (
        <ListItem key={props.text.replace(" ", "")} button className={classes.item} onClick={props.click}>
            <div className={classes.button}>
                <ListItemIcon className="side-nav-entry">{props.icon}</ListItemIcon>
                <ListItemText hidden className="side-nav-entry" primary={props.text}/>
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
    console.log(matches);
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
