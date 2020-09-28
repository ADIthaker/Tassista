import React , {Fragment, useContext, useEffect, useState} from 'react';
import useStyles from './NavStyles';
import {AppBar, Button, Toolbar,Typography, Box, Menu, MenuItem} from '@material-ui/core';
import {NavLink, Link, useHistory} from 'react-router-dom';
import {userContext} from '../../contexts/userContext';


const Navbar = (props) => {
  const context = useContext(userContext);
  // const user  = context.getUser('token');
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const classes = useStyles();
  const history = useHistory();
  const logoutHandler = async () => {
    setAnchorEl(null);
      const resp = await fetch('http://localhost:4000/logout',{
        method: 'GET',
        withCredentials: true,
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
    }});
    const respJson = await resp.json();
    localStorage.clear();
    context.setAppAuth(null);
    context.setAuth(false);
    history.push('/');
    }
    //console.log(user,"from navbar");
    console.log(context.user, context.isAuth);
  if(context.user === null || !context.isAuth ){
    return (
        // <nav style={{ width: '100%', position:"fixed", zIndex:'100', backgroundColor:'white' }}>
           <AppBar position = "relative" className = {classes.appbar}>
            <Toolbar className={classes.toolbar} >
              <Box ml={5} >
              <Typography  className={classes.logo} > 
                <NavLink to='/' className = {classes.homelink} >
                  Tassista
                </NavLink>
              </Typography>
              </Box>
              <Box pl={4} > 
              <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          Account
          </Button>
              <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem component={NavLink} to='/login' onClick={()=>setAnchorEl(null)} >
                    Login
                  </MenuItem>  
              {/* <NavLink to='/login' style={{ textDecoration: 'none' }} >
                <Button className = {classes.login}>Login</Button>
              </NavLink> */}
                  <MenuItem component={NavLink} to='/register' onClick={()=>setAnchorEl(null)} >
                    Signup
                  </MenuItem> 
                {/* <NavLink to='/register' style={{ textDecoration: 'none' }}>
                  <Button className = {classes.login}> Sign Up</Button>
                </NavLink> */}
              </Menu> 
              </Box>
            </Toolbar>
          </AppBar> 
          //  <Box display="flex" flexDirection="row" >
          // <Box className={classes.navbar} ml={4}>
          //     <Box ml={5}>
          //     <Typography  className={classes.logo} > 
          //       <NavLink to='/' className = {classes.homelink} >
          //         Tassista
          //       </NavLink>
          //     </Typography>
          //     </Box>
          // </Box>
          // <Box className={classes.navbar_reverse} mr={4}>
          //     <Box ml={5} >
          //     <NavLink to='/login' style={{ textDecoration: 'none' }} >
          //       <Button className = {classes.login}>Login</Button>
          //     </NavLink>

          //       <NavLink to='/register' style={{ textDecoration: 'none' }}>
          //         <Button className = {classes.login}> Sign Up</Button>
          //       </NavLink> 
          //     </Box>
          // </Box>
          // </Box>
          // </nav> 
      
    );
  } else {
    return (
      <div style={{ width: '100%' }}>
       <AppBar position = "fixed" className = {classes.appbar}>
         <Toolbar className={classes.toolbar}>
           <Box ml={5}>
          <Typography  className={classes.logo} > 
            <NavLink to='/' className = {classes.homelink} >
               Tassista
            </NavLink>
           </Typography>
           </Box>
           <Box pl={4} > 
           <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          Account
          </Button>
              <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem component={NavLink} to='/profile' onClick={()=>setAnchorEl(null)} >
                    My profile
                  </MenuItem> 
                  <MenuItem onClick={logoutHandler}  >
                    Logout
                  </MenuItem> 
                  </Menu>
          </Box>
         </Toolbar>
       </AppBar>
       </div>
      /* <Box display="flex" flexDirection="row" >
          <Box className={classes.navbar} ml={4}>
              <Box ml={5}>
              <Typography  className={classes.logo} > 
                <NavLink to='/' className = {classes.homelink} >
                  Tassista
                </NavLink>
              </Typography>
              </Box>
          </Box>
          <Box className={classes.navbar_reverse} mr={4}>
              <Box ml={5} >
              <NavLink to='/profile' style={{ textDecoration: 'none' }}>
                  <Button className = {classes.login}> Profile </Button>
                </NavLink>
              <Button className = {classes.login} onClick={logoutHandler}>Logout</Button> 
              </Box>
          </Box>
          </Box> */
          
    );
  }
      
}

export default Navbar;