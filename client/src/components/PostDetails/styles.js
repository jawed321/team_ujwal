import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    borderRadius: '20px',
    objectFit: 'contain',
    width: '60%',
    textAlign:'center',
    maxHeight: '300px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      maxHeight: '500px',
    },
  },
  card: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
  },
  imageSection: {
    textAlign:'center',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      width:'100%'
    },
  },
  loadingPaper: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '15px', height: '39vh',
  },
  commentsInnerContainer: {
    height: '200px',
    overflow: 'auto',
    marginRight: '30px',
    maxWidth:'100%',
    [theme.breakpoints.down('sm')]: {
      marginRight:'0',
      marginTop:'20px',
    },
  },
  commentbox:{
    width:'60%',
    [theme.breakpoints.down('sm')]: {
      width:'100%'
    },
  },
  commentsOuterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection:'column-reverse',
      justifyContent:'flex-end',
      width:'100%'
    },
  }
}));