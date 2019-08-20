import React, {useState} from 'react';
import {Container, InputBase, ListItemText, makeStyles} from "@material-ui/core";
import Fade from "@material-ui/core/Fade";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
    root: {
        color: 'inherit',
        width: "100%",
        margin: "14px",
        zIndex: "1202"
    },
    input: {
        position: "relative",
        padding: theme.spacing(1, 1, 1, 1),
        width: '100%',
        border: "1px solid #eee",
        borderRadius: "3px",
        cursor: "text"
    },
    item: {
        opacity: 1,
        filter: "blur(0)"
    }

}));

const allresults = ["Test", "TEST2", "BLA", "Bla", "BlaB"];

const SearchBar = () => {
    const classes = useStyles();
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);


    const onChange = (event) => {
        let list = [];
        const value = event.target.value;
        setSearch(value);
        if (value === "") {
            setResults([]);
            return;
        }
        let searchList = allresults;
        if (results.length > 0) {
            searchList = results;
        }
        searchList.map((item, index) => {
            if (item.match(value)) {
                list.push(item);
            }
        });
        setResults(list);
    };

    return (<Container>
            <InputBase
                placeholder="Suche…" className={classes.search}
                value={search} onChange={onChange}
                classes={{
                    root: classes.root,
                    input: classes.input
                }}
                inputProps={{'aria-label': 'search'}}
            />
            <Fade style={{position: "absolute", width: "15%"}} in={results.length > 0}>
                <Container>
                    <Paper className={classes.paper}>
                        <List component="nav">
                            {results.map((item, index) => {
                                return (
                                    <ListItem style={{opacity: 1, filter: "blur(0)"}} button key={index}>
                                        <ListItemText primary={item}/>
                                    </ListItem>);
                            })}
                        </List>
                    </Paper>
                </Container>
            </Fade>
        </Container>
    );
};


export default SearchBar;
