import React, {useContext, useState} from 'react';
import {Container, InputBase, makeStyles} from "@material-ui/core";
import StateContext from "../../contexts/StateContext";

const useStyles = makeStyles(theme => ({
    search: {
        paddingTop: `20px`,
        paddingBottom: `20px`,
    },
    input: {
        position: "relative",
        border: "1px solid #eee",
        borderRadius: "3px",
        cursor: "text",
        padding: "10px"
    },
    item: {
        opacity: 1,
        filter: "blur(0)"
    },
    root: {
        width: "100%"
    }

}));


const SearchBar = (props) => {
    const classes = useStyles();
    const search = useContext(StateContext);


    const onChange = (event) => {
        search.changeSearchContent(event.target.value)
    };

    return (<Container>
            <InputBase
                placeholder="Suche…" className={classes.search} style={{color: props.color || "white"}}
                value={search.searchContent} onChange={onChange}
                classes={{
                    input: classes.input,
                    root: classes.root
                }}
                inputProps={{'aria-label': 'search'}}
            />
        </Container>
    );
};


export default SearchBar;
