import React , {Fragment, useState, useContext} from 'react';
import Login from './components/Login/Login';
import SignUp from './components/Signup/SignUp';
import Home from './components/Home/Home';
import {Switch, Route, NavLink} from 'react-router-dom';
import Navbar from './components/Nav/Navbar';


const App = () =>  {
  //
  //const userData = useContext(userContext);
  return(
    <Fragment>
      <Navbar />
      <Switch>
        <Route path="/login">
            <Login/>
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
