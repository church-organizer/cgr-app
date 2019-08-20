import React from 'react';
import {AppBar, Button, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import FaceIcon from '@material-ui/icons/Face';
import SettingsIcon from '@material-ui/icons/Settings';
import Grid from "@material-ui/core/Grid";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import SearchBar from "../Search/Search";


const ITEM_HEIGHT = 100;

const linkNames = () => {
    return [<Link to={"/wiki"}>Wiki</Link>,
        <Link to={"/rating"}>Rating</Link>,
        <Link to={"/media"}>Medien</Link>]
};

/**
 * The Nav
 * username is required
 * @param props[username]
 * @returns {*}
 * @constructor
 */
const TopNav = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const matches = useMediaQuery('(min-width:1100px)');

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <AppBar id="appBar">

            <Grid container justify={"space-between"}>
                <Grid item xs={6}>
                    <Grid container justify={"flex-start"}>
                        <Typography style={{margin: "12px"}} variant="h5">
                            <Link id="homeButton" to="/">
                                <Button color={"primary"} variant={"contained"} size={"large"}>
                                    Organizer
                                </Button>
                            </Link>
                        </Typography>
                        {matches ? linkNames().map((item, index) => {
                                return <Button key={index} classes={{root: {padding: 0}}}
                                               style={{margin: "12px"}}
                                               color={"inherit"} variant={"contained"}>
                                    {item}
                                </Button>
                            }
                        ) : ""}

                        <Menu anchorEl={anchorEl} variant={"selectedMenu"} keepMounted open={open} onClose={handleClose}
                              PaperProps={{
                                  style: {
                                      maxHeight: ITEM_HEIGHT * 4.5,
                                      width: 200
                                  },
                              }}>
                            {linkNames().map((item, index) => (
                                <MenuItem key={index} onClick={handleClose}>
                                    {item}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Grid>
                </Grid>
                <Grid item xs>
                    <Grid container justify={"center"}>
                        <SearchBar/>
                    </Grid>
                </Grid>
                <Grid hidden={!matches} item xs>
                    <Grid container justify={"flex-end"}>
                        <Link to={"/settings"}>
                            <Avatar style={{margin: "11px"}}>
                                <SettingsIcon fontSize={"medium"} color={"inherit"}/>
                            </Avatar>
                        </Link>
                        <Avatar style={{margin: "10px", border: "1px solid #eee"}}>
                            <FaceIcon/>
                        </Avatar>
                    </Grid>
                </Grid>
            </Grid>
        </AppBar>

    );
};

export default TopNav;
