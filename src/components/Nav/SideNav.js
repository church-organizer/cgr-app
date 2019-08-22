import React from 'react';
import {
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemIcon, ListItemText,
    makeStyles, Typography,
} from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import clsx from 'clsx';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import "./Nav.css";


const initWidth = 200;

const useStyles = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar,
    drawerOpen: {
        width: initWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
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
    return (
        <ListItem key={props.text.replace(" ", "")} button style={{
            paddingLeft: 0,
            paddingRight: 0, display: "block", borderRadius: '2px'
        }} onClick={props.click}>
            <div className="sideNavButton">
                <ListItemText className="sideNavItemText" primary={props.text}/>
            </div>
        </ListItem>
    );
};

/**
 * The Sidenav
 * the content is required, it is a list with SideNavItems
 * @param props [content]
 * @returns {*}
 * @constructor
 */
const SideNav = (props) => {
    const matches = useMediaQuery('(min-width:1100px)');
    const classes = useStyles();


    const teens = [
        <SideNavItem key={1} to={"/teens/bla"} text={"bla"}/>,
        <SideNavItem key={1} to={"/teens/bla2"} text={"bla2"}/>,];
    const youth = [
        <SideNavItem key={1} to={"/jugend/bla"} text={"bla"}/>,
        <SideNavItem key={1} to={"/jugend/bla2"} text={"bla2"}/>,
    ];
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
            <List>
            <Typography variant={"inherit"}>Teens</Typography>
            {teens.map((item, index)=> (item))}
            </List>
        </Drawer>
    );
};

export default SideNav;
