import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  featuredCardContainer: {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
    height: '490px',
    textDecoration: 'none',
  },
  card: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  cardRoot: {
    position: 'relative',
  },
  cardMedia: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.575)',
    backgroundBlendMode: 'darken',
  },
  cardContent: {
    color: '#fff',
    width: '40%',
    zIndex: 2,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  cardContentRoot: {
    position: 'relative',
    backgroundColor: 'transparent',
  },
}));
