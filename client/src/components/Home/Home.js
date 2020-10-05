import React , {Fragment, useEffect, useContext, useState} from 'react';
import {userContext} from '../../contexts/userContext';
import useStyles from './HomeStyles';
import {AppBar, Button, Toolbar,Typography, Box, Grid} from '@material-ui/core';
import bgImg from '../../assets/images/624_gold.jpg';
import {NavLink, Link, useHistory} from 'react-router-dom';

const Home = (props) => {
    const classes = useStyles();
    const context = useContext(userContext);
    //const user = context.getUser('token');
    // console.log(context.user,"in home from sessionstorage");
    if(context.user === null && !context.isLoading ){
        return ( 
        <div className={classes.main} my={2} >
            {/* <img src={bgImg} className={classes.img}/> */}
    </div>
    );
    } else if(context.isLoading){
        return null;
    } else if(context.user.role==='user') {
        return(
            <div className={classes.main} my={2} >
                    <p>{context.user.email}</p>
                    {
                        context.ride.isRide ? 
                        <Button component={NavLink} to="/request/make">Go to Map</Button>:
                        <Button component={NavLink} to="/request/edit">Go to Ride</Button> 
                    }
                    
            </div>
        );
    } else if(context.user.role==='driver') {
        return(
            <div className={classes.main} my={2} >
                    {/* <img src={bgImg} className={classes.img}/> */}
                    <p>{context.user.email}</p>
                    hello driver
                    <Button component={NavLink} to="/requests/all" >Check All Requests</Button>
            </div>
        );
    }
    
}
export default Home;