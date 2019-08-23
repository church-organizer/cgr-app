import React from 'react';
import {
    Divider,
    Drawer,
    List,
    makeStyles, Typography,
} from "@material-ui/core";
import clsx from 'clsx';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import "./Nav.css";
import {Link} from "react-router-dom";
import SearchBar from "../Search/Search";
import FileLoader from "../../services/FileLoader";


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
        <div>asd</div>
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
    console.log(structure);
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
            <Link className={classes.header} to={"/"}><Typography component={"h3"} variant={"inherit"}> CGR Wiki</Typography></Link>
            <SearchBar/>
            <Divider/>
            <List>
                <Typography variant={"inherit"}>Teens</Typography>
                {/*{teens.map((item, index) => (item))}*/}
                <Typography variant={"inherit"}>Jugend</Typography>
                {/*{youth.map((item, index) => (item))}*/}
            </List>
        </Drawer>
    );
};

export default SideNav;
