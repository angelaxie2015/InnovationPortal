import React, { useState } from 'react';
import {
    IconButton,
    InputBase,
    Paper
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    input: {
      marginLeft: 1,
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
});

export default function SearchBar(props) {
    const classes = useStyles();
    
    const [query, setQuery] = useState("");

    const handleChange = event => {
        setQuery(event.target.value);
    }

    const handleSubmit = event => {
        event.preventDefault();
        props.onSearch(query);
    }

    return (
        <Paper component="form" className={classes.root} onSubmit={handleSubmit}>
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
                <SearchIcon />
            </IconButton>
            <InputBase
                className={classes.input}
                placeholder={`Search ${props.item}`}
                inputProps={{ 'aria-label': `search ${props.item}` }}
                onChange={handleChange}
            />
        </Paper>
    );
}