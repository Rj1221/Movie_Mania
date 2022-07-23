import React, { useEffect, useState } from 'react';
import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery, useTheme } from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import useStyles from './styles';
import { SideBar, Search } from '../index';
import { fetchToken, moviesApi, createSessionId } from '../../utils';
import { setUser, userSelector } from '../../features/auth';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector(userSelector);
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:600px)');
  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = useState(false);
  const token = localStorage.getItem('request_token');
  const sessionIdFromLocalStorage = localStorage.getItem('session_id');
  useEffect(() => {
    const loginUser = async () => {
      if (token) {
        if (sessionIdFromLocalStorage) {
          const { data: userData } = await moviesApi.get(`/account?session_id=${sessionIdFromLocalStorage}`);
          dispatch(setUser(userData));
        } else {
          const sessionId = await createSessionId();
          const { data: userData } = await moviesApi.get(`/account?session_id=${sessionId}`);
          dispatch(setUser(userData));
        }
      }
    };
    loginUser();
  }, [token]);
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
          { !isMobile && <Search /> }
          <div>
            { !isAuthenticated ? (
              <Button color="inherit" onClick={fetchToken}>Login &nbsp; <AccountCircle /></Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to={`/user/${user.id}`}
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
          { isMobile && <Search /> }
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
