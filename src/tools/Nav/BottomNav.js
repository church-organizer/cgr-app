import React from 'react';
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import PanoramaIcon from '@material-ui/icons/Panorama';
import BookIcon from '@material-ui/icons/Book';
import StarRateIcon from '@material-ui/icons/StarRate';
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import {makeStyles,} from "@material-ui/core";
import {Link} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";


const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        width: "100%",
        position: "fixed",
        bottom: 0,
        height: "50px",
        borderTop: "1px solid #eee",
        zIndex: 1202,
        backgroundColor: "#eee",
        boxShadow: "0px 4px 20px 0px rgba(0,0,0,0.75)"
    },
    onActive: {
        color: "#4b64ee"
    },
    link: {
        width: "30%"
    }
});

const BottomNav = (props) => {
    const classes = useStyles();
    const [value, setValue] = React.useState('');
    const matches = useMediaQuery('(min-width:1100px)');
    
    // const path= props.pathname.split("/")[1];
    

    const onClick = (newValue) => {
        setValue(newValue)
    };

    if (matches) {
        return '';
    }
    return (
        <Grid className={classes.root} container justify={"space-evenly"}>
            <Grid item xs={12}>
                <Tabs indicatorColor="primary" textColor="secondary" value={value} aria-label="icon label tabs example">
                    <Grid item xs>
                        <Link onClick={() => onClick(0)} to={"/wiki"}>
                            <Tab classes={value=== 0? {labelIcon: classes.active} : {}} icon={<PanoramaIcon/>} aria-label="wiki" label={"Wiki"}/>
                        </Link>
                    </Grid>
                    <Grid item xs>
                        <Link onClick={() => onClick(1)} to={"/rating"}>
                            <Tab icon={<PanoramaIcon/>} aria-label="rating" label={"Rating"}/>
                        </Link>
                    </Grid>
                    <Grid item xs>
                        <Link onClick={() => onClick(2)} to={"/media"}>
                            <Tab icon={<PanoramaIcon/>} aria-label="Media" label={"Medien"}/>
                        </Link>
                    </Grid>
                </Tabs>
            </Grid>
        </Grid>);

};


export default BottomNav;
