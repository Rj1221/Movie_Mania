import React, { useState } from 'react';
import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery, useTheme } from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import useStyles from './styles';
import { SideBar } from '../index';

const Navbar = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:600px)');
  const isAuthenticated = true;
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          { isMobile && (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              style={{ outline: 'none' }}
              onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
            >
              <Menu />
            </IconButton>
          ) }
          <IconButton color="inherit" sx={{ ml: 1 }} onClick={() => { }}>
            { theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 /> }
          </IconButton>
          { !isMobile && 'Search...' }
          <div>
            { !isAuthenticated ? (
              <Button color="inherit" onClick={() => { }}>Login &nbsp; <AccountCircle /></Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to="/profile/:id"
                onClick={() => { }}
                className={classes.linkButton}
              >
                { !isMobile && <>MyMovies &nbsp;</> }
                <Avatar
                  alt="Profile"
                  style={{ width: '30px', height: '30px' }}
                  src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60"
                />
              </Button>
            ) }
          </div>
          { isMobile && 'Search...' }
        </Toolbar>
      </AppBar>
      <div>
        <nav className={classes.drawer}>
          { isMobile ? (
            <Drawer
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              <SideBar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer variant="permanent" classes={{ paper: classes.drawerPaper }} open>
              <SideBar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) }
        </nav>
      </div>
    </>
  );
};

export default Navbar;
