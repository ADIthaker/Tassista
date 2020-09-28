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
import { createMuiTheme, ThemeProvider, responsiveFontSizes} from '@material-ui/core/styles';

let theme1 = createMuiTheme({
  typography: {
      fontFamily: 'Rubik, sans-serif',
      h5:{
          fontSize:30,
          fontFamily: 'Playfair Display, serif',
          fontWeight: 500,
          color:'black',
      },
      h2:{
        fontSize: 45,
    },
    button: {
      color: 'black',
    },
    palette:{
      primary: {
        main:'#000'
      }
    }

    },
});
theme1 = responsiveFontSizes(theme1)
const App = () =>  {
  const context = useContext(userContext);
  console.log(context.user);
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
