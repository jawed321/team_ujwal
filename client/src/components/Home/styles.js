import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  prepost:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  appBarSearch: {
    borderRadius: 4,
    marginTop:'1rem',
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
  },
  appBarSearch1: {
    display:'none',
    borderRadius: 4,
    marginBottom: '1rem',
    padding: '16px',
    [theme.breakpoints.down('xs')]: {
      display:'flex',
    },
  },
  pagination: {
    borderRadius: 10,
    marginTop: '1.5rem',
    padding: '16px',
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
}));