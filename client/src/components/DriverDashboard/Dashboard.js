import React,{useContext, useEffect} from 'react';
import {AppBar, Button, Toolbar,Typography, Box, Container, Avatar, Grid,useMediaQuery} from '@material-ui/core';
import {userContext} from '../../contexts/userContext';
import  useStyles from "./DashboardStyles";
import { useHistory, Redirect } from 'react-router-dom';
import StarIcon from '@material-ui/icons/Star';

const Dashboard = (props) => {

    const classes = useStyles();
    const context = useContext(userContext);
    const history = useHistory(); 
    console.log(context.user,'from dashboard');
    if(context.user === null){
        return (<Redirect to="/" />);
    } 
    else {
        return(
            <Container maxWidth="md" className={classes.main}>
                <div className={classes.overlay}></div>
               <Grid container>
                   <Grid  item md={4}>
                    <Grid  container style={{position:"relative",
                            top:'-100px',
                            alignItems:"center",
                            }}>
                        <Grid item md={12}>
                        <Avatar src={context.user.picture} className={classes.profile}/>
                        </Grid>
                        <Grid item md={12}>
                        <Typography className={classes.title}>
                            {context.user.username}
                        </Typography>
                        </Grid>
                    </Grid>
                    </Grid>
                    <Grid item md={8}>
                        <Grid container>
                            <Grid item md={12}>
                            <Typography>Email: {context.user.email}</Typography>
                            <Typography>Phone Number: {context.user.phoneNo}</Typography>
                            <Typography>Type: {context.user.type}</Typography>
                            <Typography>Ratings: {context.user.rating}</Typography>

                            </Grid>
                        </Grid>
                    
                    </Grid>
               </Grid>
                  
                
            </Container>
        );
    }
    
}

export default Dashboard;