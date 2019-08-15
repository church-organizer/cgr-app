import React from 'react';
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from '@material-ui/icons/Restore';
import PanoramaIcon from '@material-ui/icons/Panorama';
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import {makeStyles,} from "@material-ui/core";
import {Link} from "react-router-dom";


const useStyles = makeStyles({
    root: {
        width: "100%",
        position: "fixed",
        bottom: 0,
        borderTop: "1px solid #eee",
        zIndex: 1202,
    },
    link: {
        width: "30%"
    }
});
const getButtons = (active) => {
    const arr = [["Wiki", "/wiki"], ["Rating", "/rating"], ["Medien", "/media"]];
    let buttons = "";
    arr.map((item, index) => {
        if (index !== active) {
            buttons += <BottomNavigationAction value={index} label={item[0]}/>
        } else {
            buttons += <Link to={item[1]}><BottomNavigationAction showLabel value={index} label={item[0]}/></Link>
        }

    });
    return buttons;
};

const BottomNav = (props) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(null);
    const matches = useMediaQuery('(min-width:1100px)');
    if (matches) {
        return '';
    }
    return (
        <BottomNavigation value={value} className={classes.root}
                          onChange={(event, newValue) => {
                              setValue(newValue);
                          }}>
            {[["Wiki", "/wiki", <RestoreIcon/>], ["Rating", "/rating", <RestoreIcon/>], ["Medien", "/media", <PanoramaIcon/>]].map((item, index) => {
                if (index === value) {
                    return <BottomNavigationAction value={index} label={item[0]} icon={item[2]}/>
                } else {
                    return <Link className={classes.link} to={item[1]}>
                        <BottomNavigationAction value={index} label={item[0]} icon={item[2]}/>
                    </Link>
                }

            })}
            {/*<BottomNavigationAction value={0} label="Wiki" icon={<RestoreIcon/>}/>*/}
            {/*<BottomNavigationAction value={1} label="Rating" icon={<RestoreIcon/>}/>*/}
            {/*<BottomNavigationAction value={2} label="Medien" icon={<RestoreIcon/>}/>*/}
        </BottomNavigation>

    );
};


export default BottomNav;
