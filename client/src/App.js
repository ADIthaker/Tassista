import React , {Fragment, useState} from 'react';
import Login from './components/Login/Login';
import SignUp from './components/Signup/SignUp';
import Home from './components/Home/Home';
import {AppBar, Button, Toolbar,Typography, Box} from '@material-ui/core';
import {Switch, Route, NavLink} from 'react-router-dom';
import useStyles from './AppStyles'; 


const App = () =>  {
  const [intialAuth, setAuth] = useState(false);
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
  .then(r=>console.log(r));
  }   
 
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
              <NavLink to='/register' style={{ textDecoration: 'none' }} >
              <Button className = {classes.login}  >Sign Up</Button>
              </NavLink> 
            </Box> 
           
          </Toolbar>
        </AppBar>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <SignUp />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Fragment>
  );

}
export default App;
