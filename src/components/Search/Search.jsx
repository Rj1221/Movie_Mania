import React, { useState } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import useStyles from './styles';
import { searchMovie } from '../../features/currentGenreOrCategory';

const Search = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const classes = useStyles();
  const [search, setSearch] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      dispatch(searchMovie(search));
      location.pathname = '/search';
    }
  };
  return (
    <div className={classes.searchContainer}>
      <TextField
        variant="standard"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyPress={handleKeyPress}
        InputProps={{
          className: classes.input,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};
export default Search;
