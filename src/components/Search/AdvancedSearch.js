import React, {useState} from "react";
import {Container, makeStyles, Typography} from "@material-ui/core";
import SearchBar from "./Search";
import FileLoader from "../../services/FileLoader";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Markdown from "../Page/Markdown";
import "./Search.css"
import Path from "../TopBar/Path";
import changeContentIfMatch from "../../services/SearchContent";


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
    const [time, setTime] = useState(0);
    const [results, setResults] = useState([]);
    let params = window.location.search.replace("?","");
    const [key, setKey] = useState(null);
    const [searchContent, setSearch] = useState("");

    if (params !== "") {
        params = params.split("&");
    } else {
        params = [];
    }

    /**
     * Search request to the Api
     * the result and the time are rendered
     * @param search content
     */
    const onSearch = (search) => {
        if (search === ""){
            setResults([]);
            setTime(0);
            setSearch("");
        }else {
            FileLoader.search(search).then((res)=> {
                const result = res.result;
                let arr = [];
                for (let item in result) {
                    arr.push([result[item][0], item, result[item][1]])
                }
                setResults(arr);
                setTime(res.time);
                setSearch(search);
            });
        }

    };

    if (key === null && params.length > 0 && results.length === 0) {
        let searchKey = "";
        for (let param of params) {
            let pair = param.split("=");
            if (pair[0] === "type" && pair[1] === "tags") {
                searchKey = "#" + searchKey;
            } else if (pair[0] === "key") {
                searchKey = searchKey + pair[1];
            }
        }
        setKey(searchKey);
        onSearch(searchKey);
    }

    return (
        <div className="advancedSearch">
            <Typography variant={"h3"}>Advanced Search</Typography>
            <SearchBar onSearch={onSearch}
                       startValue={key}
                       color={"#444444"}/>
            {time > 0 ? <Typography className={classes.time}>Suche beendet in {time} Sekunden</Typography> : ""}
            <Container>
                {results.map((item, index) => {
                    return (
                        <Paper className={classes.result} key={index}>
                            <Typography variant={"h5"}> {item[0]}</Typography>
                            <Typography style={{color: "#4e4eaf"}} variant={"subtitle1"}>
                                <Path folder={item[1].split("/").slice(1)}/>
                            </Typography>
                            <Divider/>
                            <Markdown source={changeContentIfMatch(item[2], searchContent)}/>
                        </Paper>);
                })}
            </Container>
        </div>);
};

export default AdvancedSearch;
