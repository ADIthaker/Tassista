import React from 'react';
import {Grid, TextField, Box, Button, Avatar} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Glogo from '../../google-hangouts.svg';
import useStyles from './SignUpStyles';


const SignUp = () => {
    const classes = useStyles();
    return(
        <Box className={classes.main}>
            <Grid container >
                <Grid item sm={3} md={4}  />
                <Grid item sm={6} md={4}  className={classes.form}>
                    <Grid container direction="column" spacing={3}>
                        <Grid item ><h1>Sign Up</h1></Grid>
                        <Grid item  style={{justifyContent: 'center',padding:'auto'}}>
                            <Button className={classes.gButton} >
                                <Avatar src={Glogo} 
                                width="24px" height="24px" 
                                className={classes.gImg} /> Continue with Google
                            </Button>  
                        </Grid>
                        <Grid item  >
                            <Box width={1} className = {classes.line} display="flex">or</Box> 
                        </Grid>
                        <Grid item className={classes.inputFields}>
                            <h3>Sign Up with E-Mail</h3>
                            <Box width={1}>
                                <form autoComplete="off" noValidate>
                                    <TextField 
                                        variant = "outlined"
                                        label="Name"
                                        name = "username"
                                        fullWidth
                                        className = {classes.root}
                                        />
                                    <TextField 
                                        variant = "outlined"
                                        label = "Email"
                                        name = "email"
                                        fullWidth
                                        className = {classes.root}
                                        />
                                    <TextField 
                                        variant = "outlined"
                                        label = "Password"
                                        name = "password"
                                        fullWidth
                                        className = {classes.root}
                                        />
                                    <Button className={classes.submitButton} width={1} >Submit</Button>
                                </form>
                            </Box>
                        </Grid>
                    
                    </Grid>
                    
                </Grid>
            <Grid item sm={3} md={4} />
        </Grid>
    {/* <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}
        </Box>
       
    );
}
export default SignUp;