import React , {Fragment, useState, useContext} from 'react';
import Login from './components/Login/Login';
import SignUp from './components/Signup/SignUp';
import Home from './components/Home/Home';
import {Switch, Route, NavLink} from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Navbar from './components/Nav/Navbar';
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
  //const userData = useContext(userContext);
  return(
    <ThemeProvider theme={theme1}>
      <Navbar />
        <Switch>
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
