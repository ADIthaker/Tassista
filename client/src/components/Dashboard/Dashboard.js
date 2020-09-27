import React,{useContext, useEffect} from 'react';
import {AppBar, Button, Toolbar,Typography, Box, Container, Avatar} from '@material-ui/core';
import {userContext} from '../../contexts/userContext';
import  useStyles from "./DashboardStyles";
import { useHistory, Redirect } from 'react-router-dom';

const Dashboard = (props) => {

    const classes = useStyles();
    const context = useContext(userContext);
    const history = useHistory();
    const user = context.getUser('token'); 
    console.log(user,'from dashboard');
    if(user === null)
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
    if(user.user === undefined || user === null){
        return (<Redirect to="/" />);
    } else {
        return(
            <Container maxWidth="md" className={classes.main}>
                <h2>{user.user.username}</h2>
            </Container>
           
        );
    }
    
}

export default Dashboard;