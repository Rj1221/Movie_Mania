import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Button, Box } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { userSelector, logout } from '../../features/auth';

const Profile = () => {
  const { user } = useSelector(userSelector);
  console.log(user);
  const favouriteMovies = [];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutUser = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6" gutterBottom>Profile</Typography>
        <Button color="inherit" onClick={logoutUser}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      { !favouriteMovies.length
        ? <Typography variant="h6" gutterBottom>Add Favourite or watchlist some movie to see them here!</Typography> : (
          <Box>
            <Typography variant="h6" gutterBottom>Favourite Movies</Typography>
            {/* { favouriteMovies.map( ( movie ) => (
            <Box key={ movie.id }>
              <Typography variant="h6" gutterBottom>{ movie.title }</Typography>
            </Box>
          ) ) } */}
          </Box>
        )}
    </Box>
  );
};

export default Profile;
