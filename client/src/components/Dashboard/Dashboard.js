import React,{useContext, useEffect} from 'react';
import {AppBar, Button, Toolbar,Typography, Box, Container, Avatar} from '@material-ui/core';
import {userContext} from '../../contexts/userContext';
import  useStyles from "./DashboardStyles";
import { useHistory, Redirect } from 'react-router-dom';

const Dashboard = (props) => {

    const classes = useStyles();
    const context = useContext(userContext);
    const history = useHistory();
    // const user = context.getUser('token'); 
    console.log(context.user,'from dashboard');
    if(context.user === null){
        return (<Redirect to="/" />);
    } 
    else {
        return(
            <Container maxWidth="md" className={classes.main}>
                <h2>{context.user.username}</h2>
            </Container>
        );
    }
    
}

export default Dashboard;