import React from 'react';
import {
    Divider,
    Drawer,
    List, ListItemText,
    makeStyles, Typography,
} from "@material-ui/core";
import clsx from 'clsx';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import "./Nav.css";
import {Link} from "react-router-dom";
import SearchBar from "../Search/Search";
import FileLoader from "../../services/FileLoader";
import ListItem from "@material-ui/core/ListItem";


const initWidth = 250;

const useStyles = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar,
    header: {
        marginTop: "15px"
    },
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
        <ListItem key={props.to} button >
            <ListItemText><Link to={props.to}>{props.label} </Link></ListItemText>
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


    const structure = new FileLoader().getStructure();
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
            <Link className={classes.header} to={"/"}><Typography component={"h3"} variant={"inherit"}> CGR
                Wiki</Typography></Link>
            <SearchBar/>
            <Divider/>
            <List>
                {structure.map((item, index) => {
                    console.log(item);
                    return (
                        <div>
                            <Typography key={index} variant={"inherit"}>{item}</Typography>
                            {new FileLoader().getStructure(item).map((link, subindex) => {
                                return <SideNavItem key={subindex} to={"/" + item + "/" + link} label={link}/>
                            })}
                            <Divider/>
                        </div>
                    );
                })}
            </List>
        </Drawer>
    );
};

export default SideNav;
