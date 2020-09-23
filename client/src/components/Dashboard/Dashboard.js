import React,{useContext, useEffect} from 'react';
import {AppBar, Button, Toolbar,Typography, Box} from '@material-ui/core';
import {userContext} from '../../contexts/userContext';
import  useStyles from "./DashboardStyles";
import { useHistory } from 'react-router-dom';

const Dashboard = (props) => {
    const classes = useStyles();
    const context = useContext(userContext);
    const history = useHistory();
    console.log(context.user,'from dashboard');
    if(context.user.user === 'No user found')
    {
        history.push('/');
    }

    // const getProfile = async () => {
    //     const resp = await fetch('http://localhost:4000/profile',{
    //             method: 'GET',
    //             withCredentials: true,
    //             credentials: 'include',
    //             headers: {
    //               'Accept': 'application/json',
    //               'Content-Type': 'application/json'
    //         }});
    //     const respJson  = await resp.json();
    //     await context.setUser(respJson);
    //     context.getUser(); 
    //     }  
    
    // useEffect(()=>{
    //     getProfile();
    //     // to get user after every re-render or if its a redirect from the oauth page
    // }, []);
    if(context.user.user === undefined){
        return (<div>Loading ...</div>);
    } else {
        return(
            <div className={classes.main}>
                <h1>{context.user.user.email}</h1>
                <p>:/</p>
            </div>
           
        );
    }
    
}

export default Dashboard;