import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  searchContainer: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
    },
  },
  input: {
    color: theme.palette.mode === 'light' && '#fff',
    filter: theme.palette.mode === 'light' ? 'invert(0%)' : 'invert(100%)',
    [theme.breakpoints.down('sm')]: {
      marginTop: '-10px',
      marginBottom: '10px',
    },
  },
}));
