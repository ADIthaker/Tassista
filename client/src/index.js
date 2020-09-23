import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import UserProvider from './contexts/userContext';
import { ParallaxProvider } from 'react-scroll-parallax';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
      fontFamily: 'Rubik, sans-serif',
      h5:{
          fontSize:1,
          fontFamily: 'Rubik, sans-serif',
          fontWeight: 600,
          color:'black',
      },
      h2:{
        fontSize: 45,
    }

    },
});

ReactDOM.render(
  
    <BrowserRouter>
      <ParallaxProvider>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <App />
        </UserProvider> 
        </ThemeProvider>
      </ParallaxProvider>
    </BrowserRouter>
    
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
