import React, { useEffect } from 'react';
import { Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import useStyles from './styles';

import { useGetGenresQuery } from '../../services/TMDB';
import genreIcons from '../../assets/genres';

const Categories = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top-rated' },
  { label: 'Upcoming', value: 'upcoming' },
];

const SideBar = ({ setMobileOpen }) => {
  const theme = useTheme();
  const classes = useStyles();
  const redLogo = 'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';

  const blueLogo = 'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';
  const { data, isFetching } = useGetGenresQuery();
  return (
    <>
      <Link to="/" className={classes.imageLink}>
        <img
          className={classes.image}
          src={theme.palette.mode === 'light' ? redLogo : blueLogo}
          alt="logo"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        { Categories.map(({ label, value }) => (
          <ListItem
            key={value}
            button
            component={Link}
            to={`/categories/${value}`}
            onClick={() => setMobileOpen(false)}
          >
            <ListItemIcon>
              <img src={genreIcons[label.toLowerCase()]} alt={label} className={classes.genreImage} height={30} />
            </ListItemIcon>
            <ListItemText primary={label} />
          </ListItem>
        )) }
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        { isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          data.genres.map(({ id, name }) => (
            <ListItem
              key={id}
              button
              component={Link}
              to={`/genres/${id}`}
              onClick={() => setMobileOpen(false)}
            >
              <ListItemIcon>
                <img src={genreIcons[name.toLowerCase()]} alt={name} className={classes.genreImage} height={30} />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          ))
        ) }

      </List>
    </>

  );
};

export default SideBar;
