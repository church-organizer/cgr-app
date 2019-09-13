import React, {useState} from 'react';
import {
    Drawer, Chip, Avatar,
    makeStyles
} from "@material-ui/core";
import clsx from 'clsx';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import "./SideBar.css";
import {Link} from "react-router-dom";
import SearchBar from "../Search/Search";
import logo from "../../files/logo.png"
import SettingsIcon from "@material-ui/icons/Settings"
import SideBarLinks from "./SideBarLinks";
import Button from "@material-ui/core/Button";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import Zoom from "@material-ui/core/Zoom";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";


const initWidth = 250;

const useStyles = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar,
    header: {
        color: "white"
    },
    drawerOpen: {
        overflowX: 'hidden',
        overflowY: 'auto',
        width: initWidth,
        background: "linear-gradient(to right, #454AA3 0%, #363A7F 44%, #2D316B 100%)"
    },
    drawerClose: {
        width: 0,
        opacity: 0.5
    },
    whiteColor: {
        color: "white"
    },
    avatar: {
        marginTop: "20px",
        cursor: "pointer",
        marginLeft: "30px",
        marginRight: "30px",
        border: "none"
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
    openButton: {
        position: "fixed",
        bottom: "10px",
        left: "10px",
        backgroundColor: "rgba(122,125,141,0.6)"
    },
    closeButton: {
        position: "absolute",
        bottom: "10px",
        right: "10px",

    }
}));


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
    const [open, setOpen] = useState(!matches);

    if (open !== props.open) {
        props.onClose(open);
    }

    /**
     * Gets the searchContent and sets it
     * @param searchContent content to search
     */
    const onSearch = (searchContent) => {
        setSearchWord(searchContent);
    };

    /**
     * changes on click the open state of the Sidebar
     * @param state
     */
    const onChange = (state) => {
        props.onClose(state);
        setOpen(state);
    };


    const structure = props.structure;
    return (
        <div>
            <Zoom in={!open}>
                <Button className={classes.openButton} onClick={() => onChange(!open)}>
                    <KeyboardArrowRightIcon color={"primary"} fontSize={"large"}/>
                </Button>
            </Zoom>
            <Drawer onClose={() => {
                if (!matches) setOpen(false)
            }} variant={matches ? "persistent" : "temporary"} open={open} anchor={"left"} classes={{
                paper: clsx({
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })
            }}>
                <div>
                    <div>
                        <Link className={classes.header} to={"/"}>
                            <Chip size={"medium"}
                                  avatar={<Avatar alt="Homepage" classes={{root: classes.noBackground}}
                                                  src={logo}/>}
                                  className={classes.avatar}
                                  variant="outlined" color={"primary"}
                                  label="Wiki" classes={{colorPrimary: classes.whiteColor}}/>
                        </Link>
                    </div>
                    <div>
                        <SearchBar onSearch={onSearch}/>
                        <Link onClick={() => !matches ? setOpen(false) : null} to={"/search"}>
                            <Chip size={"medium"}
                                  avatar={<Avatar className="rotate-center"
                                                  classes={{root: classes.noBackground}}><SettingsIcon/></Avatar>}
                                  className={classes.advancedSearch}
                                  variant="outlined" color={"primary"}
                                  label="Advanced Search" classes={{colorPrimary: classes.whiteColor}}/>
                        </Link>
                    </div>
                    <SideBarLinks setOpen={(value) => {
                        if (!matches) setOpen(value)
                    }} structure={structure} searchWord={seachWord}/>
                    {!matches ?
                        <Button className={classes.closeButton} onClick={() => setOpen(!open)} color={"primary"}>
                            <KeyboardArrowLeftIcon color={"action"}
                                                   fontSize={"large"}/>
                        </Button> : ""}
                </div>
            </Drawer>
        </div>
    );
};

export default SideBar;
