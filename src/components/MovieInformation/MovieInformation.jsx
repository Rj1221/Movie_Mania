import React, { useState } from 'react';
import { Modal, Typography, Button, ButtonGroup, Grid, Box, CircularProgress, useMediaQuery, Rating } from '@mui/material';
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, Remove, FavoriteBorderOutlined, ArrowBack } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useGetMovieQuery, useGetRecommendationsQuery } from '../../services/TMDB';
import useStyles from './styles';
import genreIcons from '../../assets/genres';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import { MovieList } from '../index';

const MovieInformation = () => {
  const { id } = useParams();
  const classes = useStyles();
  const { data, isFetching, error } = useGetMovieQuery(id);
  const dispatch = useDispatch();
  const { data: recommendations, isFetching: isRecommendationsFetching } = useGetRecommendationsQuery({ list: '/recommendations', movie_id: id });
  const isMovieFavourite = false;
  const isMovieWatchList = false;
  const [open, setOpen] = useState(false);
  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Link to="/"> Something went wrong </Link>
      </Box>
    );
  }
  const addToFavourites = async () => {
  };
  const addToWatchList = async () => {};
  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4}>
        <img
          className={classes.poster}
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.title}
        />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>
          { data?.title } ({ data?.release_date?.split('-')[0] })
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          { data?.tagline }
        </Typography>
        <Grid item className={classes.containerSpaceAround}>
          <Box align="center">
            <Rating
              value={data.vote_average / 2}
              readOnly
              size="medium"
              className={classes.rating}
            />
            <Typography variant="subtitle1" align="center" gutterBottom style={{ marginLeft: '10px' }}>
              { Math.round(data.vote_average * 100) / 100 }/10 ({ data.vote_count }) votes
            </Typography>
          </Box>
          <Typography variant="h6" align="center" gutterBottom>
            { data?.runtime }min{ data?.spoken_languages.length > 0 ? `/ ${data?.spoken_languages[0].name}` : '' }
          </Typography>
        </Grid>
        <Grid item className={classes.genresContainer}>
          { data?.genres.map((genre, i) => (
            <Link key={i} className={classes.links} to="/" onClick={() => dispatch(selectGenreOrCategory(genre.id))}>
              <img src={genreIcons[genre.name.toLowerCase()]} alt={genre.name} className={classes.genreImages} height={30} />
              <Typography color="textPrimary" variant="subtitle1">
                { genre?.name }
              </Typography>
            </Link>
          )) }
        </Grid>
        <Typography variant="h5" gutterBottom style={{ marginTop: '10px' }}>
          Overview
        </Typography>
        <Typography style={{ marginBottom: '2rem' }}>
          { data?.overview }
        </Typography>
        <Typography variant="h5" gutterBottom>
          Cast
        </Typography>
        <Grid item container spacing={2}>
          { data && data?.credits?.cast.map((cast, i) => (
            cast?.profile_path && (
              <Grid item key={i} xs={4} md={2} component={Link} to={`/actors/${cast?.id}`} style={{ textDecoration: 'none' }}>
                <img src={`https://image.tmdb.org/t/p/w500/${cast?.profile_path}`} alt={cast?.name} className={classes.castImages} />
                <Typography color="textPrimary" gutterBottom>
                  { cast?.name }
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  { cast?.character.split('/')[0] }
                </Typography>
              </Grid>
            )
          )).slice(0, 6) }
        </Grid>
        <Grid item container style={{ marginTop: '2rem' }}>
          <div className={classes.buttonsContainer}>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup variant="outlined" size="small">
                <Button target="_blank" rel="noopener noreferrer" href={data?.homepage} endIcon={<Language />}>
                  Website
                </Button>
                <Button target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${data?.imdb_id}`} endIcon={<MovieIcon />}>
                  IMDB
                </Button>
                <Button onClick={() => setOpen(true)} href="#" endIcon={<Theaters />}>
                  Trailer
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup variant="outlined" size="medium">
                <Button onClick={addToFavourites} endIcon={isMovieFavourite ? <FavoriteBorderOutlined /> : <Favorite />}>
                  { isMovieFavourite ? 'Remove from favourites' : 'Favourite' }
                </Button>
                <Button onClick={addToWatchList} endIcon={isMovieWatchList ? <Remove /> : <PlusOne />}>
                  Watchlist
                </Button>
                <Button endIcon={<ArrowBack />} sx={{ borderColor: 'primary.main' }}>
                  <Typography component={Link} to="/" color="inherit" variant="subtitle2" style={{ textDecoration: 'none' }}>
                    Back
                  </Typography>
                </Button>

              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h5" gutterBottom align="center">
          You Might Also Like
        </Typography>
        {/* Loop through Recommended Movies... */ }
        { recommendations ? <MovieList movies={recommendations} numberOfMovies={12} />
          : (
            <Box>
              Sorry no recommendations Movie found
            </Box>
          ) }
      </Box>
      <Modal
        closeAfterTransition
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
      >
        { data?.videos?.results?.length > 0 && (
          <iframe
            autoPlay
            className={classes.video}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Trailer"
            src={`https://www.youtube.com/embed/${data?.videos?.results[0]?.key}`}
          />
        )}
      </Modal>
    </Grid>
  );
};

export default MovieInformation;
