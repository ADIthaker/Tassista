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
    } else {
        return(
            <div className={classes.main} my={2} >
                    {/* <img src={bgImg} className={classes.img}/> */}
                    <p>{context.user.email}</p>
                    <Button component={NavLink} to="/request/make">Go to Map</Button>
            </div>
        );
    }
    
}
export default Home;