import React , {Fragment} from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login/Login';
import SignUp from './components/Signup/SignUp';
import Home from './components/Home/Home';
import {Switch, Route, Link} from 'react-router-dom';

function App() {
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
      <Link to='/'>Uber</Link>
      <Link to='/login'>Login</Link>
      <Link to='/register'>Sign Up</Link>
      
      <button onClick={()=>logoutHandler()} >Logout</button>
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
