import React, {useState} from 'react';
import {Container, InputBase, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    search: {
        paddingTop: "20px",
    },
    input: {
        position: "relative",
        // width: '100%',
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
    const [search, setSearch] = useState(props.startValue || '');


    const onChange = (event) => {
        setSearch(event.target.value);
        props.onSearch(event.target.value);
    };

    return (<Container>
            <InputBase
                placeholder="Suche…" className={classes.search} style={{color: props.color || "white"}}
                value={search} onChange={onChange}
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
