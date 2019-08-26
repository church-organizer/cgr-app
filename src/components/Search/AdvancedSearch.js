import React, {useState} from "react";
import {Container, makeStyles, Typography} from "@material-ui/core";
import SearchBar from "./Search";
import FileLoader from "../../services/FileLoader";
import Paper from "@material-ui/core/Paper";
import {Link} from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Divider from "@material-ui/core/Divider";
import Markdown from "../Content/Markdown";


const useStyle = makeStyles(theme => ({
    root: {
        position: "relative",
        left: "20%",
        top: "100px",
        width: "60%",
        overflowY: "scrollable"
    },
    result: {
        margin: "20px",
        textAlign: "left",
        padding: "20px"
    },
    time: {
        color: "#666",
        fontSize: "14px",
        textAlign: "left",
        paddingLeft: "32px"
    }
}));

async function doSearch(searchWord, setResults) {
    const fileLoader = new FileLoader();
    const structure = fileLoader.getStructure();
    const results = [];
    for (let item of structure) {
        let pages = fileLoader.getStructure(item);
        for (let page of pages) {
            await FileLoader.getContentFromFile("/" + item + "/" + page).then(text => {
                let match = text.toLowerCase().match(searchWord.toLowerCase());
                if (match && searchWord !== "") {
                    let index = match.index;
                    let path = "/" + item + "/" + page;
                    results.push([page, path, "..." + text.slice(index - 20, index + searchWord.length + 20) + "..."]);
                }
            });
        }
    }
    setResults(results);
}


const AdvancedSearch = () => {
    const classes = useStyle();
    const [time, setTime] = useState(0);
    const [results, setResults] = useState([]);

    const onSearch = (search) => {
        let startDate = new Date();
        doSearch(search, (result) => {
            setResults(result)
        });
        setTime((new Date().getTime() - startDate.getTime()) / 1000);
        if (search === ""){
            setTime(0);
        }
    };

    return (
        <div className={classes.root}>
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
