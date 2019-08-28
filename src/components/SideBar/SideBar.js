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
import SettingsIcon from "@material-ui/icons/Settings"


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
        width: "100%",
    },
    avatar: {
        marginTop: "20px",
        cursor: "pointer",
        marginLeft: "30px",
        marginRight: "30px",
        border: "none"
    },
    listItem: {
        margin: "10px",
        paddingTop: 0,
        paddingBottom: 0
    },
    advancedSearch: {
        marginTop: 0,
        cursor: "pointer",
        marginLeft: "30px",
        marginRight: "30px",
        border: "none"
    },
    noBackground: {
        background: "none"
    },
    fullWidth: {
        width: "100%",
    },
    link: {
        width: "max-content",
        color: "white"
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
        <Link className={classes.link} to={props.to}>
            <ListItem key={props.to} button>
                <ListItemText classes={{root: classes.fullWidth}}>
                    <Typography>
                        {props.label}
                    </Typography>
                </ListItemText>
            </ListItem>
        </Link>
    );
};

const SideBarLinks = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(0);
    const structure = props.structure;
    const searchWord = props.searchWord;
    let folder = [];
    for (let item in props.structure) {
        folder.push(item);
    }
    return (folder.map((item, index) => {
        return (
            <div key={index}>
                <Link to={"/" + item} className={classes.link}>
                    <ListItem onClick={() => setOpen(index)} component={"h3"}
                              classes={{root: classes.listItem}}>
                        <Typography className={classes.listHeader}
                                    variant={"inherit"}>{item}
                        </Typography>
                    </ListItem>
                </Link>
                {structure[item].map((link, subindex) => {
                    if (open === index && searchWord === "") {
                        if (searchWord !== "" && link.match(searchWord) !== null) {
                            return <SideBarItem key={subindex} to={"/" + item + "/" + link} label={link}/>
                        } else if (searchWord === "") {
                            return <SideBarItem key={subindex} to={"/" + item + "/" + link} label={link}/>
                        }
                    } else {
                        if (searchWord !== "" && link.match(searchWord) !== null) {
                            return <SideBarItem key={subindex} to={"/" + item + "/" + link} label={link}/>
                        }
                    }
                    return "";
                })}
                <Divider/>
            </div>
        );
    }));
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
    const [seachWord, setSearchWord] = useState("");

    const onSearch = (searchContent) => {
        setSearchWord(searchContent);
    };


    const structure = props.structure;
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
                <Chip size={"medium"}
                      avatar={<Avatar alt="Homepage" classes={{root: classes.noBackground}} src={logo}/>}
                      className={classes.avatar}
                      variant="outlined" color={"primary"}
                      label="Wiki" classes={{colorPrimary: classes.whiteColor}}/>
            </Link>
            <div>
                <SearchBar onSearch={onSearch}/>
                <Link to={"/search"}>
                    <Chip size={"medium"}
                          avatar={<Avatar classes={{root: classes.noBackground}}><SettingsIcon/></Avatar>}
                          className={classes.advancedSearch}
                          variant="outlined" color={"primary"}
                          label="Advanced Search" classes={{colorPrimary: classes.whiteColor}}/>
                </Link>
            </div>
            <Divider/>
            <List className={classes.whiteColor}>
                <SideBarLinks structure={structure} searchWord={seachWord}/>
            </List>
        </Drawer>
    );
};

export default SideBar;
