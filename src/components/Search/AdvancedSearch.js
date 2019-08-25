import React, {useState} from "react";
import {Container, makeStyles, Typography} from "@material-ui/core";
import SearchBar from "./Search";
import FileLoader from "../../services/FileLoader";

const useStyle = makeStyles(theme => ({
    root: {
        position: "relative",
        left: "20%",
        width: "60%"
    }
}));

const doSearch = (searchWord, setResults) => {
    const fileLoader = new FileLoader();
    const structure = fileLoader.getStructure();
    let pages;
    let results = [];
    for (let item of structure) {
        pages = fileLoader.getStructure(item);
        for (let page of pages) {
            FileLoader.getContentFromFile("/" + item + "/" + page).then(text => {
                if (text.toLowerCase().match(searchWord.toLowerCase()) && searchWord !== "") {
                    let index = text.indexOf(searchWord);
                    let path = "/" + item + "/" + page;
                    results.push([path, "..." + text.slice(index - 10, index + 10) + "..."]);
                    //     results.push([page, "..." + text.slice(index - 10, index + 10) + "..."]);
                    //     setResults(results);
                }
            })
        }
    }
    setResults(results);
};


const AdvancedSearch = () => {
    const classes = useStyle();
    const [searchWord, setSearchWord] = useState("");
    const [results, setResults] = useState([]);

    const onSearch = (search) => {
        setSearchWord(search);
        doSearch(search, (result) => setResults(result));
    };

    return (
        <div className={classes.root}>
            <Typography variant={"h4"}>
                <SearchBar onSearch={onSearch} color={"#444444"}/>
            </Typography>
            <Container>
                {console.log(results.length)}
                {console.log(results)}
                {results.map((item, index) => {
                    console.log(item);
                    return (
                        <div>
                            <a href={item[0]}>{item[0]}</a>
                            <p>{item[1]}</p>
                        </div>);
                })}
            </Container>
        </div>);
};

export default AdvancedSearch;
