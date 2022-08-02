import React, { useState } from 'react';
import { Box, Button, Typography, Grid, CircularProgress } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { useGetActorsDetailsQuery, useGetMoviesByActorQuery } from '../../services/TMDB';
import useStyles from './styles';
import { MovieList, Pagination } from '../index';

const Actors = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isFetching, error } = useGetActorsDetailsQuery(id);
  const [page, setPage] = useState(1);
  const { data: movies } = useGetMoviesByActorQuery({ id, page });
  const classes = useStyles();
  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }
  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Button startIcon={<ArrowBack />} onClick={() => navigate('/')}>
          Back
        </Button>
      </Box>
    );
  }
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          <img src={`https://image.tmdb.org/t/p/w500${data?.profile_path}`} alt={data?.name} className={classes.image} />
        </Grid>
        <Grid item lg={7} xl={8} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <Typography variant="h4" gutterBottom>{ data?.name }</Typography>
          <Typography variant="h5" gutterBottom>
            Born: { new Date(data?.birthday).getDate() }/{ new Date(data?.birthday).getMonth() + 1 }/{ new Date(data?.birthday).getFullYear() }
          </Typography>
          <Typography variant="body2" align="justify" paragraph>{ data?.biography || 'Sorry no biography yet ....' }</Typography>
          <Box marginTop="2rem" display="flex" justifyContent="space-around">
            <Button variant="contained" color="primary" target="_blank" href={`https://www.imdb.com/name/${data?.imdb_id}`}>
              IMDB
            </Button>
            <Button color="primary" startIcon={<ArrowBack />} onClick={() => navigate('/')}>
              Back
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box marginTop="2rem 0">
        <Typography variant="h3" gutterBottom align="center">
          Movies
        </Typography>
        { isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress size="8rem" />
          </Box>
        ) : (
          movies && <MovieList movies={movies} numberOfMovies={12} />
        ) }
        <Pagination currentPage={page} setPage={setPage} totalPages={movies?.total_pages} />
      </Box>
    </React.Fragment>

  );
};

export default Actors;
