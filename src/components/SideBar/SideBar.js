import React, {useContext, useState} from 'react';
import {
    Drawer, Chip, Avatar,
    makeStyles
} from "@material-ui/core";
import clsx from 'clsx';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import "./SideBar.css";
import {Link} from "react-router-dom";
import SearchBar from "../Search/Search";
import SideBarLinks from "./SideBarLinks";
import Button from "@material-ui/core/Button";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import Zoom from "@material-ui/core/Zoom";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import FileLoader from "../../services/FileLoader";
import StateContext from "../../contexts/StateContext";
import { postPath } from '../../services/strapi.service';


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
    const sidebar = useContext(StateContext).sidebar;
    const page = useContext(StateContext).page;
    const loginState = useContext(StateContext).login;
    const [pathName, setPathName] = useState('');


    /**
     * changes on click the open state of the Sidebar
     * @param state
     */
    const onChange = (state) => {
        sidebar.changeSideBarOpen(state, sidebar.openCategory);
    };

    const handleChange = (event) => {
        event.preventDefault();
        setPathName(event.target.value);
    }

    const changeOpenCloseButton = () => {
        if (!matches) {
            return (
                <Button className={classes.closeButton} onClick={() => onChange(!sidebar.open)} color={"primary"}>
                    <KeyboardArrowLeftIcon color={"action"} fontSize={"large"}/>
                </Button>);
        }
        return "";
    };

    const newPath = (
        <div>
            <input type="text" placeholder="Bereich:" value={pathName} onChange={e => setPathName(e.target.value)}></input>
            <input type="button" value="Hinzufuegen" onClick={
                () => {
                    if (pathName) {
                        postPath(pathName).then((res) => {
                            setPathName('');
                            window.location.reload();
                        });
                    }
                }
            } />
        </div>
    );

    const structure = props.structure;
    return (
        <div>
            <Zoom in={!sidebar.open}>
                <Button className={classes.openButton} onClick={() => onChange(!sidebar.open)}>
                    <KeyboardArrowRightIcon color={"primary"} fontSize={"large"}/>
                </Button>
            </Zoom>
            <Drawer onClose={() => {
                if (!matches) onChange(false)
            }} variant={matches ? "persistent" : "temporary"} open={sidebar.open} anchor={"left"} classes={{
                paper: clsx({
                    [classes.drawerOpen]: sidebar.open,
                    [classes.drawerClose]: !sidebar.open,
                })
            }}>
                <div>
                    <div>
                        <Link className={classes.header} to={"/"} onClick={()=> page.changeReadOnly(true)}>
                            <Chip size={"medium"}
                                  avatar={<Avatar classes={{root: classes.noBackground}}
                                                  src={FileLoader.url + "images/logo.png"}/>}
                                  className={classes.avatar}
                                  variant="outlined" color={"primary"}
                                  label="Wiki" classes={{colorPrimary: classes.whiteColor}}/>
                        </Link>
                    </div>
                    <div>
                        <SearchBar/>
                    </div>
                    <SideBarLinks setOpen={(value) => !matches ? onChange(value): {}}
                                  structure={structure}/>
                    { loginState.isLoggedIn && newPath }
                </div>
            </Drawer>
        </div>
    );
};

export default SideBar;
