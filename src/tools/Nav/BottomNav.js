import React from 'react';
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from '@material-ui/icons/Restore';
import PanoramaIcon from '@material-ui/icons/Panorama';
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import {makeStyles,} from "@material-ui/core";
import {Link} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles({
    root: {
        width: "100%",
        position: "fixed",
        bottom: 0,
        borderTop: "1px solid #eee",
        zIndex: 1202,
        backgroundColor: "#eee",
        boxShadow: "0px 4px 20px 0px rgba(0,0,0,0.75)"
    },
    link: {
        width: "30%"
    }
});

const BottomNav = (props) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(null);
    const matches = useMediaQuery('(min-width:1100px)');
    if (matches) {
        return '';
    }
    return (
        <AppBar className={classes.root} position={"static"}>
            <Grid container>
                <Tabs variant={"fullWidth"} scrollButtons={"off"} value={value} onChange={(event, newValue) => {
                    setValue(newValue)}}>
                    <Link to={"/wiki"}><Tab icon={<PanoramaIcon/>} aria-label="wiki"/></Link>
                    <Link to={"/rating"}><Tab icon={<PanoramaIcon/>} aria-label="rating"/></Link>
                    <Link to={"/media"}><Tab icon={<PanoramaIcon/>} aria-label="media"/></Link>
                </Tabs>
            </Grid>
        </AppBar>);
    {/*<BottomNavigation value={value} className={classes.root}*/
    }
    {/*                  onChange={(event, newValue) => {*/
    }
    {/*                      setValue(newValue);*/
    }
    {/*                  }}>*/
    }
    {/*    {[["Wiki", "/wiki", <RestoreIcon/>], ["Rating", "/rating", <RestoreIcon/>], ["Medien", "/media",*/
    }
    {/*        <PanoramaIcon/>]].map((item, index) => {*/
    }
    {/*        return <BottomNavigationAction key={index} showLabel value={index} label={item[0]} icon={item[2]}/>*/
    }

    {/*    })}*/
    }
    {/*</BottomNavigation>*/
    }


};


export default BottomNav;
