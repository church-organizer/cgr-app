import React, {useState} from 'react';
import {
    Divider,
    Drawer,
    List, ListItemText,
    makeStyles, Typography,
} from "@material-ui/core";
import clsx from 'clsx';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import "./SideBar.css";
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
 * The Item component for the SideBar
 * all params are required
 * needs an icon, a text and a click method
 * @param props
 * @returns {*}
 * @constructor
 */
export const SideBarItem = (props) => {
    return (
        <ListItem key={props.to} button>
            <ListItemText><Link to={props.to}>{props.label} </Link></ListItemText>
        </ListItem>
    );
};

/**
 * The SideBar
 * the content is required, it is a list with SideBarItems
 * @param props [content]
 * @returns {*}
 * @constructor
 */
const SideBar = (props) => {
    const matches = useMediaQuery('(min-width:1100px)');
    const classes = useStyles();
    const [open, setOpen] = useState(0);

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
            <Link className={classes.header} to={"/"}>
                <Typography component={"h3"} variant={"inherit"}> CGR Wiki</Typography>
            </Link>
            <SearchBar/>
            <Divider/>
            <List>
                {structure.map((item, index) => {
                    return (
                        <div>
                            <Typography onClick={() => setOpen(index)} key={index} variant={"inherit"}>{item}</Typography>
                            {open === index ? new FileLoader().getStructure(item).map((link, subindex) => {
                                return <SideBarItem key={subindex} to={"/" + item + "/" + link} label={link}/>
                            }): ""}
                            <Divider/>
                        </div>
                    );
                })}
            </List>
        </Drawer>
    );
};

export default SideBar;
