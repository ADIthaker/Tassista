import React , {Fragment, useContext, useEffect} from 'react';
import useStyles from './NavStyles';
import {AppBar, Button, Toolbar,Typography, Box} from '@material-ui/core';
import {NavLink, Link, useHistory} from 'react-router-dom';
import {userContext} from '../../contexts/userContext';


const Navbar = (props) => {
    
  const context = useContext(userContext);
  const classes = useStyles();
  const history = useHistory();
  const logoutHandler = async () => {
      const resp = await fetch('http://localhost:4000/logout',{
        method: 'GET',
        withCredentials: true,
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
    }});
    const respJson = await resp.json();
    await context.setUser({"user": "No user found"});
    context.getUser();
    history.push('/');
    }
    
  if(context.user.user === undefined || context.user.user === "No user found" ){
    return (
      
        <div style={{ width: '100%' }}>
          {/* <AppBar position = "fixed" className = {classes.appbar}>
            <Toolbar className={classes.toolbar}>
              <Box ml={5}>
              <Typography  className={classes.logo} > 
                <NavLink to='/' className = {classes.homelink} >
                  Tassista
                </NavLink>
              </Typography>
              </Box>
              <Box pl={4} > 
              {/* <Link to='/register'>Login</Link>  
              <NavLink to='/login' style={{ textDecoration: 'none' }} >
                <Button className = {classes.login}>Login</Button>
              </NavLink>

                <NavLink to='/register' style={{ textDecoration: 'none' }}>
                  <Button className = {classes.login}> Sign Up</Button>
                </NavLink> 
              </Box>
            </Toolbar>
          </AppBar> */}
          <Box display="flex" flexDirection="row" >
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
              <NavLink to='/login' style={{ textDecoration: 'none' }} >
                <Button className = {classes.login}>Login</Button>
              </NavLink>

                <NavLink to='/register' style={{ textDecoration: 'none' }}>
                  <Button className = {classes.login}> Sign Up</Button>
                </NavLink> 
              </Box>
          </Box>
          </Box>
          </div>
      
    );
  } else {
    return (
      <div>
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
          {/* <Link to='/register'>Login</Link>  */}
          <Button className = {classes.login} onClick={logoutHandler}>Logout</Button>
          </Box>
        </Toolbar>
      </AppBar>
      </div>
    );
  }
      
}

export default Navbar;