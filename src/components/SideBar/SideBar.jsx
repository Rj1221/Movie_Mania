import React, { useEffect } from 'react';
import { Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import useStyles from './styles';

const demoCategories = [
  { label: 'Action', value: 'action' },
  { label: 'Adventure', value: 'adventure' },
  { label: 'Animation', value: 'animation' },
  { label: 'Comedy', value: 'comedy' },
  { label: 'Crime', value: 'crime' },
  { label: 'Documentary', value: 'documentary' },
  { label: 'Drama', value: 'drama' },
  { label: 'Family', value: 'family' },
  { label: 'Fantasy', value: 'fantasy' },
  { label: 'History', value: 'history' },
  { label: 'Horror', value: 'horror' },
  { label: 'Music', value: 'music' },
  { label: 'Mystery', value: 'mystery' },
  { label: 'Romance', value: 'romance' },
  { label: 'Science Fiction', value: 'science-fiction' },
  { label: 'TV Movie', value: 'tv-movie' },
  { label: 'Thriller', value: 'thriller' },
  { label: 'War', value: 'war' },
  { label: 'Western', value: 'western' },
];
const Categories = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top-rated' },
  { label: 'Upcoming', value: 'upcoming' },
];

function SideBar({ setMobileOpen }) {
  const theme = useTheme();
  const classes = useStyles();
  const redLogo = 'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';

  const blueLogo = 'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';
  return (
    <>
      <Link to="/" className={classes.imageLink}>
        <img
          className={classes.image}
          src={theme.palette.type === 'light' ? redLogo : blueLogo}
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
            <ListItemText primary={label} />
          </ListItem>
        )) }
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        { demoCategories.map(({ label, value }) => (
          <Link key={value} to={`/categories/${value}`} className={classes.links}>
            <ListItem button onClick={() => setMobileOpen(false)}>
              {/* <ListItemIcon>
                <img src={redLogo} alt="logo" className={classes.genreImage} height={30} />
              </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        )) }
      </List>
    </>

  );
}

export default SideBar;
