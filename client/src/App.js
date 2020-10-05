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
import { createMuiTheme, ThemeProvider, responsiveFontSizes} from '@material-ui/core/styles';

let theme1 = createMuiTheme({
  typography: {
      fontFamily: 'Rubik, sans-serif',
      h5: {
          fontSize:30,
          fontFamily: 'Playfair Display, serif',
          fontWeight: 500,
          color:'black',
      },
      h2: {
        fontSize: 52,
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
        fontSize: 17,
      }

    },
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
          <Route path="/driver/profile">
            <DriverDashboard />
          </Route>
          <Route path="/login">
              <Login/>
          </Route>
          <Route path="/request/make">
            <UserMap />
          </Route>
          <Route path="/register">
            <SignUp />
          </Route>
          <Route path="/profile">
            <Dashboard />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </ThemeProvider>
  );
   

}
export default App;
