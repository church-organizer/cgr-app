import React, {useState} from "react";
import {Container, makeStyles, Typography} from "@material-ui/core";
import SearchBar from "./Search";
import FileLoader from "../../services/FileLoader";
import Paper from "@material-ui/core/Paper";
import {Link} from "react-router-dom";

const useStyle = makeStyles(theme => ({
    root: {
        position: "relative",
        left: "20%",
        width: "60%"
    },
    result: {
        margin: "20px",
        textAlign: "left",
        padding: "20px"
    }
}));

async function doSearch (searchWord, setResults){
    const fileLoader = new FileLoader();
    const structure = fileLoader.getStructure();
    const results = [];
    for (let item of structure) {
        let pages = fileLoader.getStructure(item);
        for (let page of pages) {
            await FileLoader.getContentFromFile("/" + item + "/" + page).then(text => {
                let match = text.toLowerCase().match(searchWord.toLowerCase());
                if (match && searchWord !== "") {
                    console.log(text.toLowerCase().match(searchWord.toLowerCase()));
                    let index = match.index;
                    let path = "/" + item + "/" + page;
                    results.push([page, path, "..." + text.slice(index - 30, index + searchWord.length+30) + "..."]);
                }
            });
        }
    }
    setResults(results);
}


const AdvancedSearch = () => {
    const classes = useStyle();
    const [searchWord, setSearchWord] = useState("");
    const [results, setResults] = useState([]);

    const onSearch = (search) => {
        setSearchWord(search);
        doSearch(search, (result) => {
            setResults(result)
        });
    };

    return (
        <div className={classes.root}>
            <Typography variant={"h4"}>
                <SearchBar onSearch={onSearch} color={"#444444"}/>
            </Typography>
            <Container>
                {results.map((item, index) => {
                    return (
                        <Paper className={classes.result} key={index}>
                            <Link to={item[1]}>
                                <Typography variant={"h5"}> {item[0]}</Typography>
                                <Typography style={{color: "#4e4eaf"}} variant={"subtitle1"}>{item[1]}</Typography>
                            </Link>
                            <Typography component={"p"}>{item[2]}</Typography>
                        </Paper>);
                })}
            </Container>
        </div>);
};

export default AdvancedSearch;
