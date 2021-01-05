import React , {Fragment, useState, useContext} from 'react';
import Login from './components/UserLogin/Login';
import SignUp from './components/UserSignup/SignUp';
import DriverSignUp from './components/DriverSignup/SignUp';
import DriverLogin from './components/DriverLogin/Login';
import DriverNav from './components/DriverNav/Navbar';
import DefaultNav from './components/DefaultNav/DefaultNav';
import Home from './components/Home/Home';
import {Switch, Route, NavLink} from 'react-router-dom';
import Dashboard from './components/UserDashboard/Dashboard';
import DriverDashboard from './components/DriverDashboard/Dashboard';
import UserNav from './components/UserNav/Navbar';
import {userContext} from './contexts/userContext';
import UserMap from './components/UserMap/UserMap';
import EditUserMap from './components/UserMap/EditUserMap';
import Requests from './components/Requests/Requests';
import DriverMap from './components/DriverMap/DriverMap';
import { createMuiTheme, ThemeProvider, responsiveFontSizes} from '@material-ui/core/styles';

let theme1 = createMuiTheme({
  typography: {
      fontFamily: 'Rubik, sans-serif',
      h5: {
          fontSize:32,
          fontFamily: 'Playfair Display, serif',
          fontWeight: 500,
          color:'black',
      },
      h2: {
        fontSize: 52,
      },
      h3:{
        fontSize: 35,
      },
      h6:{
        fontSize: 24
      },
      button: {
        color: 'black',
      },
      palette: {
        primary: {
          main:'#000'
        }
      },
      formMsg: {
        color: 'grey',
        fontFamily: 'Rubik, sans-serif',
        fontWeight: 400,
        fontSize:'14px',
      },
      reqForm: {
        fontFamily: 'Rubik, sans-serif',
        fontWeight: 500,
        fontSize: 19,
      },
}
});
theme1 = responsiveFontSizes(theme1)
const App = () =>  {
  const context = useContext(userContext);
  if(context.isLoading){
    return null;
  }
  let navbar = (<DefaultNav />);
  if(context.user && context.user.role==='user'){
    navbar = <UserNav />;
  }else if(context.user && context.user.role==='driver'){
    navbar = <DriverNav />;
  }
  const isDriver = context.user && context.user.role==='driver';
  const isUser = context.user && context.user.role === 'user'; 
  return(
    <ThemeProvider theme={theme1}>
      {navbar}
        <Switch>
          <Route path="/driver/login">
          <DriverLogin/>
          </Route>
          <Route path="/driver/register">
              <DriverSignUp/>
          </Route>
          <Route path="/register">
            <SignUp />
          </Route>
          <Route path="/login">
              <Login/>
          </Route>
          <Route path="/driver/profile">
          {isDriver ? <DriverDashboard /> : <Home />} 
          </Route> 
          <Route path="/request/make">
          {isUser ? <UserMap /> : <Home />}
          </Route>
          <Route path="/request/edit">
          {isUser ? <EditUserMap /> : <Home />}
          </Route>
          <Route path="/request/accept/:reqId">
          {isDriver ? <DriverMap /> : <Home />}
          </Route>
          <Route path="/requests/all">
          {isDriver ? <Requests /> : <Home />}
          </Route>
          <Route path="/profile">
          {isUser ? <Dashboard /> : <Home />}
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>

      </ThemeProvider>
  );
   

}
export default App;
