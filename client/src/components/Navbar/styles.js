import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  headerOptions: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
    alignItems:'center',
    width: "400px",
    marginRight:"20px",
    flexDirection:'row',
  },
  appBar: {
    //borderRadius: 15,
    margin: '0',
    // display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    padding: '10px 20px',
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
    textDecoration: 'none',
  },
  image: {
    marginLeft: '15px',
  },
  // toolbar: {
  //   display: 'flex',
  //   justifyContent: 'flex-end',
  //   width: '400px',
  // },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems:'center',
    width: '280px',
  },
  mobprofile: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    marginRight:'5px'
  },
  menuButton: {
    marginRight: theme.spacing(0),
    
  },
  headerButtons:{
    "&.active":{
      backgroundColor:'#3f51b5',
      color:'white'
    },
    marginRight:'20px',
  },
  confirmButton:{
    textAlign:'center',
    width:'250px',
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-evenly',
    marginTop:'15px'
  },
  confirmbox:{
    textAlign:'center'
  },
  title: {
    [theme.breakpoints.down("sm")]: {
      flexGrow: 1
    }
  },
}));