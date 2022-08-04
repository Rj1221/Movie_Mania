import React, { useContext, useEffect, useState } from 'react';
import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery, useTheme } from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import useStyles from './styles';
import { SideBar, Search } from '../index';
import { fetchToken, moviesApi, createSessionId } from '../../utils';
import { setUser, userSelector } from '../../features/auth';
import { ColorModeContext } from '../../utils/ToggleColorMode';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector(userSelector);
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:600px)');
  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = useState(false);
  const token = localStorage.getItem('request_token');
  const colorMode = useContext(ColorModeContext);
  const sessionIdFromLocalStorage = localStorage.getItem('session_id');
  console.log(user);
  useEffect(() => {
    // To check if the user is authenticated or not
    const loginUser = async () => {
      if (token) {
        if (sessionIdFromLocalStorage) {
          const { data: userData } = await moviesApi.get(`/account?session_id=${sessionIdFromLocalStorage}`);
          dispatch(setUser(userData));
        } else {
          // For the first time, fetch token and create session id
          const sessionId = await createSessionId();
          const { data: userData } = await moviesApi.get(`/account?session_id=${sessionId}`);
          dispatch(setUser(userData));
        }
      }
    };
    loginUser();
  }, [token]);
  return (
    <React.Fragment>
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
          <IconButton color="inherit" sx={{ ml: 1 }} onClick={colorMode.toggleColorMode}>
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
                { !isMobile && <React.Fragment>{user?.username}&nbsp;</React.Fragment> }
                <Avatar
                  alt="Profile"
                  style={{ width: '30px', height: '30px' }}
                  src={`https://image.tmdb.org/t/p/w64_and_h64_face/${user?.avatar?.tmdb?.avatar_path}`}
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
    </React.Fragment>
  );
};

export default Navbar;
