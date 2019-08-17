import React from 'react';
import PanoramaIcon from '@material-ui/icons/Panorama';
import BookIcon from '@material-ui/icons/Book';
import StarRateIcon from '@material-ui/icons/StarRate';
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import {makeStyles,} from "@material-ui/core";
import {Link} from "react-router-dom";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: "100%",
        position: "fixed",
        bottom: 0,
        height: "70px",
        borderTop: "1px solid #eee",
        zIndex: 1202,
        backgroundColor: "#eee",
        boxShadow: "0px 4px 20px 0px rgba(0,0,0,0.75)"
    },
    onActive: {
        color: "#44499f",
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    link: {
        width: "30%"
    }
}));

const BottomNav = (props) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const matches = useMediaQuery('(min-width:1100px)');
    


    const onClick = (newValue) => {
        setValue(newValue)
    };

    if (matches) {
        return '';
    }
    return (
        <Grid className={classes.root} container justify={"space-evenly"}>
            <Grid item xs={12}>
                <Tabs value={value} aria-label="icon label tabs example">
                    <Tab style={{display: "none"}}/>
                    <Grid item xs={4}>
                        <Link onClick={() => onClick(1)} to={"/wiki"}>
                            <Tab classes={value=== 1? {labelIcon: classes.onActive} : {}} icon={<BookIcon/>} aria-label="wiki" label={"Wiki"}/>
                        </Link>
                    </Grid>
                    <Grid item xs={4}>
                        <Link onClick={() => onClick(2)} to={"/rating"}>
                            <Tab classes={value=== 2? {labelIcon: classes.onActive} : {}} icon={<StarRateIcon/>} aria-label="rating" label={"Rating"}/>
                        </Link>
                    </Grid>
                    <Grid item xs={4}>
                        <Link onClick={() => onClick(3)} to={"/media"}>
                            <Tab classes={value=== 3? {labelIcon: classes.onActive} : {}} icon={<PanoramaIcon/>} aria-label="Media" label={"Medien"}/>
                        </Link>
                    </Grid>
                </Tabs>
            </Grid>
        </Grid>);

};


export default BottomNav;
