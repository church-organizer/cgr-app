import React from 'react';
import {AppBar, Button, Toolbar, Typography, makeStyles, InputBase, GridListTile} from "@material-ui/core";
import {Link} from "react-router-dom";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import FaceIcon from '@material-ui/icons/Face';
import Grid from "@material-ui/core/Grid";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import useMediaQuery from '@material-ui/core/useMediaQuery';


const useStyles = makeStyles(theme => ({
    appBar: {
        position: "static",
        minHeight: "60px",
        minWidth: "500px"
    },
    toolbar: theme.mixins.toolbar,
    typography: {
        flexGrow: 1
    },
    loginButton: {
        right: "20px",
        position: "absolute"
    },
    inputRoot: {
        color: 'inherit',
        width: "100%"
    },
    inputInput: {
        position: "relative",
        padding: theme.spacing(1, 1, 1, 1),
        transition: theme.transitions.create('width'),
        width: '100%',
        border: "1px solid #eee",
        borderRadius: "3px",
        cursor: "text"
    },
    navButton: {
        padding: "8px",
        margin: "4px",
        color: "#eee"
    },
    menuButton: {
        padding: "8px",
        margin: "4px",
        height: "50px",
        width: "50px"
    },
    login: {
        height: "50px",
        borderRadius: "20px",
        minWidth: "110px",
        padding: "10px",
        margin: "4px"
    },
    avatar: {
        margin: "7px"
    },
    search: {
        padding: "8px",
        margin: "4px",
    }
}));

const ITEM_HEIGHT = 100;

const menuItems = () => {
    return (
        [
            <Link to="/wiki"><Button color={"inherit"}
                                     variant={"contained"}>Wiki</Button></Link>,
            <Link to="/rating"><Button color={"inherit"}
                                       variant={"contained"}>Bewerten</Button></Link>,
            <Link to="/media"><Button color={"inherit"}
                                      variant={"contained"}>Medien</Button></Link>
        ]
    );
};

const TopNav = (props) => {
    const classes = useStyles();
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
        <AppBar className={classes.appBar}>

            <Grid container justify={"space-between"}>
                <Grid item xs={6}>
                    <Grid container justify={"flex-start"}>
                        <Typography className={classes.navButton} variant="h5">
                            <Link id={"homeButton"} to="/">
                                <Button color={"primary"} variant={"contained"} size={"large"}>
                                    Organizer
                                </Button>
                            </Link>
                        </Typography>
                        {!matches ? <IconButton
                            className={classes.menuButton}
                            aria-label="more"
                            aria-controls="long-menu"
                            aria-haspopup="true"
                            onClick={handleClick}>
                            <MoreVertIcon/>
                        </IconButton> : menuItems().map((item, index) => (
                            <Typography key={index} className={classes.navButton} variant="h6">
                                {item}
                            </Typography>
                        ))}

                        <Menu id="nav-media-menu" anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}
                              PaperProps={{
                                  style: {
                                      maxHeight: ITEM_HEIGHT * 4.5,
                                      width: 200,
                                  },
                              }}>
                            {menuItems().map((item, index) => (
                                <MenuItem key={index}>
                                    <Typography className={classes.navButton} variant="h6">
                                        {item}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Grid>
                </Grid>
                <Grid item xs>
                    <Grid container justify={"center"}>
                        <InputBase
                            placeholder="Suche…" className={classes.search}
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput
                            }}
                            inputProps={{'aria-label': 'search'}}
                        />
                    </Grid>
                </Grid>
                <Grid item xs>
                    <Grid container justify={"flex-end"}>
                        <Chip
                            avatar={
                                <Avatar className={classes.avatar}>
                                    <FaceIcon/>
                                </Avatar>
                            }
                            label={"Hi " + props.username}
                            className={classes.login}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </AppBar>

    );
};

export default TopNav;
