import React , {Fragment, useContext} from 'react';
import useStyles from './NavStyles';
import {AppBar, Button, Toolbar,Typography, Box} from '@material-ui/core';
import {NavLink} from 'react-router-dom';
import useData from '../../hooks/useData';

const Navbar = (props) => {
    //const userData = useContext(UserProvider.context);
    const [setData, getData, user] = useData();
    const classes = useStyles();
    const logoutHandler = () => {
        return fetch('http://localhost:4000/logout',{
          method: 'GET',
          withCredentials: true,
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
      }})
      .then(j=>j.json())
      .then(r=>{
        console.log(r);
        setData({"user": "No user found"});
      });
      }

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
    
      return (
        <Fragment>
            <AppBar position = "static" className ={classes.appbar}>
              <Toolbar>
                <Typography className = {classes.root}>
                  <NavLink to='/' className = {classes.homelink}> Uber </NavLink> 
                </Typography>
                <NavLink to='/login' style={{ textDecoration: 'none' }} >
                <Button className = {classes.login}>Login</Button>
                </NavLink>
                <Box mx={1}>
                    <NavLink to='/register' style={{ textDecoration: 'none' }}>
                    <Button className = {classes.login}>Sign Up</Button>
                    </NavLink> 
                </Box>
               <Button className = {classes.login} onClick={logoutHandler}>Logout</Button>
              </Toolbar>
            </AppBar>
        </Fragment>
      );
}

export default Navbar;