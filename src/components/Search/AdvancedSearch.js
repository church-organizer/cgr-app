import React, {useState} from "react";
import {Container, makeStyles, Typography} from "@material-ui/core";
import SearchBar from "./Search";
import FileLoader from "../../services/FileLoader";
import Paper from "@material-ui/core/Paper";
import {Link} from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import Markdown from "../Content/Markdown";
import "./Search.css"


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



const AdvancedSearch = () => {
    const classes = useStyle();
    const [time, setTime] = useState(0);
    const [results, setResults] = useState([]);

    const onSearch = (search) => {
        FileLoader.search(search).then((res)=> {
            const result = res.result;
            let arr = [];
            for (let item in result) {
                arr.push([item, result[item][0], result[item][1]])
            }
            setResults(arr);
            setTime(res.time);
        });
    };

    return (
        <div className="advancedSearch">
            <Typography variant={"h3"}>Advanced Search</Typography>
            <SearchBar onSearch={onSearch} color={"#444444"}/>
            {time > 0 ? <Typography className={classes.time}>Suche beendet in {time} Sekunden</Typography> : ""}
            <Container>
                {results.map((item, index) => {
                    return (
                        <Paper className={classes.result} key={index}>
                            <Link to={item[1]}>
                                <Typography variant={"h5"}> {item[0]}</Typography>
                                <Typography style={{color: "#4e4eaf"}} variant={"subtitle1"}>{item[1]}</Typography>
                            </Link>
                            <Divider/>
                            <Markdown source={item[2]}/>
                        </Paper>);
                })}
            </Container>
        </div>);
};

export default AdvancedSearch;
