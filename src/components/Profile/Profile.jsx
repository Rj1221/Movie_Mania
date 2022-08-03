import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Button, Box } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { userSelector, logout } from '../../features/auth';
import { useGetListsQuery } from '../../services/TMDB';
import { RatedCards } from '../index';

const Profile = () => {
  const { user } = useSelector(userSelector);
  console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutUser = () => {
    dispatch(logout());
    navigate('/');
  };

  const { data: favoriteMovies, refetch: refetchFavorites } = useGetListsQuery({ listName: 'favorite/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });
  const { data: watchlistMovies, refetch: refetchWatchlisted } = useGetListsQuery({ listName: 'watchlist/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });
  useEffect(
    () => {
      refetchFavorites();
      refetchWatchlisted();
    },
    [],
  );
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6" gutterBottom>My Profile</Typography>
        <Button color="inherit" onClick={logoutUser}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      { !favoriteMovies?.results?.length && !watchlistMovies?.results?.length
        ? <Typography variant="h6" gutterBottom>Add Favourite or watchlist some movie to see them here!</Typography> : (
          <Box>
            <RatedCards title="Favorite Movies" data={favoriteMovies} />
            <RatedCards title="WatchList Movies" data={watchlistMovies} />
          </Box>
        )}
    </Box>
  );
};

export default Profile;
