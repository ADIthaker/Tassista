import React , {Fragment, useEffect, useContext, useState} from 'react';
import {userContext} from '../../contexts/userContext';
import useStyles from './HomeStyles';
import {AppBar, Button, Toolbar,Typography, Box, Grid,CardActions,CardContent,Card} from '@material-ui/core';
import bgImg from '../../assets/images/white.jpg';
import drvimg from '../../assets/images/driving.svg';
import usrimg from '../../assets/images/user.svg';
import {NavLink, Link, useHistory} from 'react-router-dom';

const Home = (props) => {
    const classes = useStyles();
    const context = useContext(userContext);
    console.log(context.ride)
    //const user = context.getUser('token');
    // console.log(context.user,"in home from sessionstorage");
    if((context.user === null || context.user===undefined) && !context.isLoading ){
        return ( 
        <div className={classes.main} my={2} >
            <div className={classes.container}>
                <img src={bgImg} className={classes.img}/>
                <div className={classes.text}>
                Welcome to Tassista,<br/> 
                the taxi app for your daily commutes and recreational travels.
                </div>
                <div className={classes.gridDiv} >
                <Grid container spacing={4} >
                    <Grid item sm={6} xs ={12} >
                        <Card>
                            <CardContent className={classes.card}>
                                <Typography variant="h5" component="h3" style={{marginBottom:'1rem'}}>
                                    User    <img src={usrimg} width="30px" height="30px" style={{marginTop:'10px',}} />
                                </Typography>
                                <Typography  className={classes.body2}>
                                Register Using the below link and become a user.
                                 You can make daily commutes and road trips making the most of the app.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button 
                                size="medium" 
                                style={{marginLeft:'2rem',marginBottom:'2rem'}}
                                component={NavLink}
                                to="/register"
                                >
                                Register
                                </Button>
                                <Button 
                                size="medium" 
                                style={{marginLeft:'2rem',marginBottom:'2rem'}}
                                component={NavLink}
                                to="/login"
                                >
                                Sign in
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item sm={6} xs ={12} >
                        <Card>
                            <CardContent className={classes.card}>
                                <Typography variant="h5" component="h3" style={{marginBottom:'1rem',}}>
                                    Driver   <img src={drvimg} width="30px" height="30px" style={{marginTop:'10px',}} />
                                </Typography>
                                <Typography  className={classes.body2}>
                                    Register using the below link and become a driver.
                                    You can work as a driver and pickup and drop customers from desired locations.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button 
                                size="medium" 
                                style={{marginLeft:'2rem',marginBottom:'2rem'}}
                                component={NavLink}
                                to="/driver/register"
                                >
                                Join Today
                                </Button>
                                <Button 
                                size="medium" 
                                style={{marginLeft:'2rem',marginBottom:'2rem'}}
                                component={NavLink}
                                to="/driver/login"
                                >
                                Log in
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </div>
            </div>
                     
        </div>
    );
    } else if(context.isLoading){
        return null;
    } else if(context.user && context.user.role==='user') {
        return(
            <div className={classes.main} my={2} >
                <div className={classes.container}>
                <img src={bgImg} className={classes.img}/>
                
                <div className={classes.text}>Hey {context.user.username.split(' ')[0]}, <br/> 
                where to today?</div>
                {
                        context.ride ? 
                        <Button component={NavLink} className={classes.imgBtn} to="/request/edit">Edit Ride</Button> :
                        <Button component={NavLink} className={classes.imgBtn}  to="/request/make">Let's Ride</Button>
                        
                }
            </div> 
                    
            </div>
        );
    } else if(context.user && context.user.role==='driver') {
        let reqLink;
        if(context.ride!==null)
            reqLink = `/request/accept/${context.ride._id}`;
        return(
            <div className={classes.main} my={2} >
                <div className={classes.container}>
                <img src={bgImg} className={classes.img}/>
                
                <div className={classes.text}>Hey {context.user.username.split(' ')[0]}, <br/>
                Ready to go?
                </div>
                    {
                        !context.ride ? 
                        <Button component={NavLink} className={classes.imgBtn} to="/requests/all" >Check All Requests</Button> :
                        <Button component={NavLink} className={classes.imgBtn} to={reqLink} >Go to Map</Button>
                        
                    }
                </div>
            </div>
        );
    }
    
}
export default Home;