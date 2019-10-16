import React, {useContext, useState} from "react";
import {Container, makeStyles, Typography} from "@material-ui/core";
import FileLoader from "../../services/FileLoader";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Markdown from "../Page/Markdown";
import "./Search.css"
import Path from "../TopBar/Path";
import changeContentIfMatch from "../../services/SearchContent";
import StateContext from "../../contexts/StateContext";


const useStyle = makeStyles(theme => ({
    root: {
        position: "relative",
        left: "10%",
        top: "100px",
        width: "80%",
        overflowY: "scrollable"
    },
    result: {
        margin: "10px",
        textAlign: "left",
        padding: "10px",
    },
    time: {
        color: "#666",
        fontSize: "14px",
        textAlign: "left",
        paddingLeft: "32px"
    }
}));


const AdvancedSearch = (props) => {
    const classes = useStyle();
    const [res, setRes] = useState({time: 0, results: [], searchContent: ""});
    const [searchContent, setSearchContent] = useState("");
    let timeOut = 0;
    const search = useContext(StateContext).search;

    /**
     * Sets the variables res, time and search
     * @param res
     * @param time
     * @param search
     */
    const applySearch = (res, time, search) => {
        setRes({time: time, results: res, searchContent: search});
    };

    const waitTillInputReady = (search) => {
        if (timeOut) {
            clearTimeout(timeOut);
        }
        timeOut = setTimeout(function () {
            sendSearchRequest(search);
        }, 300);
    };

    const sendSearchRequest = (search) => {
        FileLoader.search(search).then((res) => {
            const result = res.result;
            let arr = [];
            for (let item in result) {
                arr.push([result[item][0], item, result[item][1]])
            }
            applySearch(arr, res.time, search);
        });
    };

    /**
     * Search request to the Api
     * the result and the time are rendered
     * todo one call per letter is too much
     * @param search content
     */
    const onSearch = (search) => {
        setSearchContent(search);
        if (search === "") {
            clearTimeout(timeOut);
            applySearch([], 0, "");
        } else {
            waitTillInputReady(search);
        }
    };
    if (searchContent === "" || searchContent !== search.content) {
        onSearch(search.content);
    }

    return (
        <div className="advancedSearch">
            <Typography variant={"h3"}>Erweiterte Suche</Typography>
            <Typography variant={"body1"}>Suche "{search.content}"</Typography>
            {res.time > 0 ? <Typography className={classes.time}>Suche beendet in {res.time} Sekunden</Typography> : ""}
            <Container>
                {res.results.map((item, index) => {
                    return (
                        <Paper className={classes.result} key={index}>
                            <Typography variant={"h5"}> {item[0]}</Typography>
                            <Typography style={{color: "#4e4eaf"}} variant={"subtitle1"}>
                                <Path folder={item[1].split("/").slice(1)}/>
                            </Typography>
                            <Divider/>
                            <Markdown source={changeContentIfMatch(item[2], res.searchContent)}/>
                        </Paper>);
                })}
            </Container>
        </div>);
};

export default AdvancedSearch;
