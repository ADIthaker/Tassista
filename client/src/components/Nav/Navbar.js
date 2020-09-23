import React , {Fragment, useContext, useEffect} from 'react';
import useStyles from './NavStyles';
import {AppBar, Button, Toolbar,Typography, Box} from '@material-ui/core';
import {NavLink} from 'react-router-dom';
import useData from '../../hooks/useData';
import {userContext} from '../../contexts/userContext';

const Navbar = (props) => {
    const context = useContext(userContext);
    //const [setData, getData, user] = useData();
    const classes = useStyles();
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
      }
//   useEffect(()=>{
//     getData(); // to get user after every re-render or if its a redirect from the oauth page
// }, []);
// let loginRoutes = initialAuth===true ? null: (<Login/>);
// let signupRoutes = initialAuth===true ? null : (<SignUp />); 
// let navbar = initialAuth===true ? null : (<Fragment>
//     <NavLink to='/login' style={{ textDecoration: 'none' }} >
//   <Button className = {classes.login}>Login</Button>
//  </NavLink>
//  <Box mx={1}>
//    <NavLink to='/register' style={{ textDecoration: 'none' }}>
//    <Button className = {classes.login}>Sign Up</Button>
//    </NavLink> 
//  </Box>
//  </Fragment>);

    if(context.user.user === undefined || context.user.user === "No user found" ){
      return (
        <Fragment>
            <AppBar position = "static" className = {classes.appbar}>
              <Toolbar>
                <Typography className = {classes.root}>
                  <NavLink to='/' className = {classes.homelink}> Uber </NavLink> 
                </Typography>
                <NavLink to='/login' style={{ textDecoration: 'none' }} >
                <Button className = {classes.login}>Login</Button>
                </NavLink>
                <Box mx={1}>
                    <NavLink to='/register' style={{ textDecoration: 'none' }}>
                    <Button className = {classes.login}> Sign Up</Button>
                    </NavLink> 
                </Box>
              </Toolbar>
            </AppBar>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
            <AppBar position = "static" className ={classes.appbar}>
              <Toolbar>
                <Typography className = {classes.root}>
                  <NavLink to='/' className = {classes.homelink}> Uber </NavLink> 
                </Typography>
                <Button className = {classes.login} onClick={logoutHandler}>Logout</Button>
              </Toolbar>
            </AppBar>
        </Fragment>
      );
   }
      
}

export default Navbar;