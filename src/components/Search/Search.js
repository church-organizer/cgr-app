import React, {useState} from 'react';
import {Container, InputBase, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        color: 'inherit',
        width: "100%",
        margin: "14px",
        zIndex: "1202"
    },
    search: {
        paddingTop: "20px",
        color: "white"
    },
    input: {
        position: "relative",
        // padding: theme.spacing(1, 1, 1, 1),
        width: '100%',
        border: "1px solid #eee",
        borderRadius: "3px",
        cursor: "text",
        padding: "10px"
    },
    item: {
        opacity: 1,
        filter: "blur(0)"
    }

}));


const SearchBar = (props) => {
    const classes = useStyles();
    const [search, setSearch] = useState('');


    const onChange = (event) => {
        setSearch(event.target.value);
        props.onSearch(event.target.value);
    };

    return (<Container>
            <InputBase
                placeholder="Suche…" className={classes.search}
                value={search} onChange={onChange}
                classes={{
                    // root: classes.root,
                    input: classes.input
                }}
                inputProps={{'aria-label': 'search'}}
            />
        </Container>
    );
};


export default SearchBar;
