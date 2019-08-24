import React, {useState} from 'react';
import {
    Divider,
    Drawer, Chip, Avatar,
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
import logo from "../../files/logo.png"


const initWidth = 250;

const useStyles = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar,
    header: {
        color: "white"
    },
    drawerOpen: {
        width: initWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        background: "linear-gradient(to bottom, #454AA3 0%, #363A7F 44%, #2D316B 100%)"
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: 0
    },
    whiteColor: {
        color: "white"
    },
    listHeader: {
        cursor: "pointer",
        width: "100%"
    },
    avatar: {
        marginTop: "20px",
        cursor: "pointer",
        marginLeft: "30px",
        marginRight: "30px",
        border: "none"
    }
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
    const classes = useStyles();
    return (
        <ListItem key={props.to} button>
            <ListItemText>
                <Typography>
                    <Link className={classes.whiteColor} to={props.to}>{props.label} </Link>
                </Typography>
            </ListItemText>
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
                <Chip size={"medium"} avatar={<Avatar alt="Homepage" src={logo}/>} className={classes.avatar}
                      variant="outlined" color={"primary"}
                      label="CGR Wiki" classes={{colorPrimary: classes.whiteColor}}/>
            </Link>

            <SearchBar/>
            <Divider/>
            <List className={classes.whiteColor}>
                {structure.map((item, index) => {
                    return (
                        <div key={index}>
                            <ListItem component={"h3"} classes={{root: classes.listItem}}>
                                <Typography className={classes.listHeader}
                                            onClick={() => setOpen(index)}
                                            variant={"inherit"}>{item}
                                </Typography>
                            </ListItem>
                            {open === index ? new FileLoader().getStructure(item).map((link, subindex) => {
                                return <SideBarItem key={subindex} to={"/" + item + "/" + link} label={link}/>
                            }) : ""}
                            <Divider/>
                        </div>
                    );
                })}
            </List>
        </Drawer>
    );
};

export default SideBar;
