// import React, { useState, useEffect } from 'react'
// import { AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core';
// import useStyles from './styles';
// import { useDispatch } from 'react-redux';
// import { useHistory, useLocation, Link } from 'react-router-dom';
// import decode from 'jwt-decode';
// //import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import {toast} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'
// //import { getUserdetail } from '../../actions/users';
// import { confirmAlert } from 'react-confirm-alert'; // Import
// import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

// function Navbar({ logo }) {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const location = useLocation();
//   const classes = useStyles();
//   const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
//   console.log(user);

//   useEffect(() => {
//     const token = user?.token;
//     setUser(JSON.parse(localStorage.getItem('profile')));
//   }, [location, user?.token, dispatch]);
//   useEffect(() => {
//     const token = user?.token;

//     if (token) {
//       const decodedToken = decode(token);

//       if (decodedToken.exp * 1000 < new Date().getTime()) logout();
//     }
//     setUser(JSON.parse(localStorage.getItem('profile')));
//   }, [location, dispatch]);

//   const logout = () => {
//     dispatch({ type: 'LOGOUT' });
//     history.go(0);
//     setUser(null);
//     toast.success('Logged Out Successfully',{
//       position:'top-center',
//       autoClose:5000,
//       draggable:true
//      })
//   }
//   const logout1 = () => {
//     confirmAlert({
//       title: 'Confirm to Logout',
//       message: 'Are you sure to logout?',
//       buttons: [
//         {
//           label: 'Yes',
//           onClick: () => {    
//             dispatch({ type: 'LOGOUT' });
//             history.go(0);
//             setUser(null);
//             toast.success('Logged Out Successfully',{
//               position:'top-center',
//               autoClose:5000,
//               draggable:true
//              })

//           }
//         },
//         {
//           label: 'No',
//           //onClick: () => {}
//         }
//       ]
//     });
//   }

//   return (
//     <>
//       <AppBar className={classes.appBar} position="static" color="inherit">
//         <div className={classes.brandContainer}>
//           <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Project Store</Typography>
//           <img className={classes.image} src={logo} alt="projectstore" height="60" />
//         </div>
//         <Button component={Link} to="/posts/favourites">View favs</Button>
//         <Button component={Link} to="/posts/myposts">My posts</Button>
//         <Toolbar className={classes.toolbar}>
//           {(user?.result) && (
//             <div className={classes.profile}>
//               <Button
//                 id="basic-button"
//                 aria-controls="basic-menu"
//                 aria-haspopup="true"
//                 aria-expanded={open ? 'true' : undefined}
//                 onClick={handleClick}
//               >
//               <Avatar className={classes.purple} alt={user?.result.name} src={user?.result?.selectedFile}>{user?.result.name.charAt(0)}</Avatar>
//               <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
//               </Button>
//               <Menu
//               id="basic-menu"
//               anchorEl={anchorEl}
//               open={open}
//               onClose={handleClose}
//               MenuListProps={{
//               'aria-labelledby': 'basic-button',
//             }}
//               >
//               <MenuItem onClick={handleClose}>View Profile</MenuItem>
//               <MenuItem onClick={handleClose} component={Link} to="/editprofile">Edit Profile</MenuItem>
//               <MenuItem onClick={handleClose} component={Link} to="/changepassword">Change Password</MenuItem>
//               </Menu>
//             </div>
//           )}
//           {user?.result ? (
//             <div className={classes.profile}>
//               {/* <Avatar className={classes.purple} alt={user?.result.name} src={user?.result?.selectedFile}>{user?.result.name.charAt(0)}</Avatar>
//               <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography> */}
//               <Button variant="contained" className={classes.logout} color="secondary" onClick={logout1}>Logout</Button>
//             </div>
//           ) : (
//             <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
//           )}
//         </Toolbar>
//       </AppBar>
//     </>
//   )
// }

// export default Navbar


import React, { useState, useEffect } from "react";
import { useTheme } from "@material-ui/core/styles";
import { AppBar, Avatar, Toolbar, Typography } from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { NavLink, withRouter } from "react-router-dom";
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import decode from 'jwt-decode';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Logo from '../assets/matpar.png'
import './Navbar.css'
const Navbar = props => {
  const { history } = props;
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  //const history = useHistory();
  const location = useLocation();
  //const classes = useStyles();
  console.log(user);

  useEffect(() => {
    const token = user?.token;
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location, user?.token, dispatch]);
  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location, dispatch]);

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    history.go(0);
    setUser(null);
  }
  const handleButtonClick = pageURL => {
    history.push(pageURL);
  };

  const menuItems = [
    {
      menuTitle: "Home",
      pageURL: "/"
    },
    {
      menuTitle: "myposts",
      pageURL: "/posts/myposts"
    },
  ];
  const menuItems2 = [
    // {
    //   menuTitle2: "View Profile",
    //   pageURL2: "/"
    // },
    {
      menuTitle2: "Edit Profile",
      pageURL2: "/editprofile"
    },
    {
      menuTitle2: "Change Password",
      pageURL2: "/changepassword"
    },
  ];

  const handleMenuClick = pageURL => {
    history.push(pageURL);
    setAnchorEl(null);
    setAnchorEl2(null);
  };
  const [open1, setOpen1] = useState(false);

  const handleClickOpen = () => {
    setOpen1(true);
    setAnchorEl2(null);
  };

  const handleClose = () => {
    setOpen1(false);
  };
  const logout1 = () => {
    setAnchorEl2(null);
    setOpen1(false);
    dispatch({ type: 'LOGOUT' });
    history.go(0);
    setUser(null);
    toast.success('Logged Out Successfully', {
      position: 'bottom-center',
      autoClose: 5000,
      draggable: true
    })

  }


  return (
    <AppBar className={classes.appBar} position="fixed" color="inherit">
      <Toolbar>
        <img src={Logo} alt="" width="44px" height="44px"/>
        <h2 className="title1">&nbsp;
          SANCHAR
        </h2>
        {isMobile ? (
          <div className={classes.mobprofile}>
            {user?.result && (
              <>
                <Button
                  id="basic-button"
                  aria-controls="basic-menu"
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={e => setAnchorEl(e.currentTarget)}
                >
                  <Avatar className={classes.purple} alt={user?.result.name} src={user?.result?.selectedFile}>{user?.result.name.charAt(0)}</Avatar>
                </Button>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                >
                  {menuItems2.map(menuItem2 => {
                    const { menuTitle2, pageURL2 } = menuItem2;
                    return (
                      <>
                        <MenuItem onClick={() => handleMenuClick(pageURL2)}>
                          {menuTitle2}
                        </MenuItem>
                      </>
                    );
                  })}
                </Menu>
              </>
            )}
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={e => setAnchorEl2(e.currentTarget)}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl2}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={Boolean(anchorEl2)}
              onClose={() => setAnchorEl2(null)}
            >
              {menuItems.map(menuItem => {
                const { menuTitle, pageURL } = menuItem;
                return (
                  <>
                    <MenuItem onClick={() => handleMenuClick(pageURL)}>
                      {menuTitle}
                    </MenuItem>
                  </>
                );
              })}
              {user?.result ? (
                <>
                  <MenuItem onClick={handleClickOpen}>
                    logout
                  </MenuItem>
                  <Dialog
                    open={open1}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Are you Sure?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        You will be logged out!
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>No</Button>
                      <Button onClick={logout1} autoFocus>
                        Yes
                      </Button>
                    </DialogActions>
                  </Dialog>
                </>
              ) : (
                <MenuItem onClick={() => handleMenuClick("/auth")}>
                  Signin
                </MenuItem>
              )}
            </Menu>
          </div>
        ) : (
          <div className={classes.headerOptions}>
            <div>
              <Button
                className={classes.headerButtons}
                variant="contained"
                component={NavLink}
                exact to="/posts"
              >
                HOME
              </Button>
              <Button
                className={classes.headerButtons}
                variant="contained"
               > 
                <a style={{textDecoration:"none",color:"rgba(0,0,0,0.87)"}} href="https://sanchar-chat.herokuapp.com/" target="_blank">chatroom</a>
              
                chatroom
              </Button>
            </div>
            {user?.result ? (
              <div className={classes.profile}>
                <Button
                  id="basic-button"
                  aria-controls="basic-menu"
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={e => setAnchorEl(e.currentTarget)}
                >
                  <Avatar className={classes.purple} alt={user?.result.name} src={user?.result?.selectedFile}>{user?.result.name.charAt(0)}</Avatar>
                  <Typography className={classes.userName} variant="h6">{user?.result.name.split(' ')[0]}</Typography>
                </Button>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                >
                  {menuItems2.map(menuItem2 => {
                    const { menuTitle2, pageURL2 } = menuItem2;
                    return (
                      <>
                        <MenuItem onClick={() => handleMenuClick(pageURL2)}>
                          {menuTitle2}
                        </MenuItem>
                      </>
                    );
                  })}
                </Menu>
                <div>
                  <Button variant="contained" className={classes.logout} color="secondary" onClick={handleClickOpen}>Logout</Button>
                  <Dialog
                    open={open1}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Are you Sure?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        You will be logged out !
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>No</Button>
                      <Button onClick={logout1} autoFocus>
                        Yes
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </div>
            ) : (
              <div>
                <Button variant="contained" onClick={() => handleButtonClick("/auth")}>Signin</Button>
              </div>
            )}
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(Navbar);