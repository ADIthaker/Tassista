import React , {Fragment, useEffect, useContext, useState} from 'react';
import {userContext} from '../../contexts/userContext';
import useStyles from './HomeStyles';
import {AppBar, Button, Toolbar,Typography, Box, Grid} from '@material-ui/core';
import bgImg from '../../assets/images/624_gold.jpg';

const Home = (props) => {
    const classes = useStyles();
    const context = useContext(userContext);
    //const user = context.getUser('token');
    // console.log(context.user,"in home from sessionstorage");
    if(context.user === null || context.user === undefined  || !context.isAuth ){
        return ( 
        <div className={classes.main} my={2} >
            {/* <img src={bgImg} className={classes.img}/> */}
    </div>
    );
    } else {
        return(
            <div className={classes.main} my={2} >
                    {/* <img src={bgImg} className={classes.img}/> */}
                    <p>{context.user.email}</p>
            </div>
        );
    }
    
}
export default Home;