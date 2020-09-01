import React,{useReducer} from 'react';
import {Grid, TextField, Box, Button, Avatar} from '@material-ui/core';
import Glogo from '../../google-hangouts.svg';
import useStyles from './LoginStyles';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const passwordRegex = /^[A-Za-z]\w{7,14}$/;
const initialState = {
    emailValue:'',
    passwordValue:'',
    validation:{
        emailValid:true,
        passwordValid:true,
    }
    
};
const reducer = (state, action)=>{
    switch(action.type) {
        case 'emailChange':
            return {... state, emailValue : action.payload };
        case 'passwordChange':
            return {... state, passwordValue : action.payload };
        case 'validation':
            return {... state, validation : action.settings};
    }
    
}

const Login = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const classes = useStyles();
    const fieldChangeHandler = (name,event) =>{
        let emailTest = state.validation.emailValid;
        let passwordTest = state.validation.passwordValid;
        if(name==='email') {
             emailTest = emailRegex.test(event.target.value);
        } else if(name==='password'){
             passwordTest = passwordRegex.test(event.target.value);
        } 
        dispatch({type:'validation',
            settings:{
                emailValid:emailTest,
                passwordValid:passwordTest,
            }
        })
        const typeToPass = name + 'Change';
        dispatch({type: typeToPass ,payload:event.target.value}); 
    }
    const redirectToProfile = (res)=>{
            return fetch('http://localhost:4000/profile',{
                method: 'GET',
                withCredentials: true,
                credentials: 'include',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
            }})
            .then(j=>j.json())
            .then(r=>console.log(r));
            
         
    }
    const formSubmitHandler = (event)=>{
        event.preventDefault();
        return fetch('http://localhost:4000/login',{
            method: 'POST',
            withCredentials: true,
            credentials: 'include',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email:state.emailValue,
                password:state.passwordValue,
            })
        }   
    ) 
    .then(r=>r.json())
    .then(res=>redirectToProfile(res))

    }

    return(
        <Box className={classes.main}>
            <Grid container >
                <Grid item sm={3} md={4}  />
                <Grid item sm={6} md={4}  className={classes.form}>
                    <Grid container direction="column" spacing={3}>
                        <Grid item ><h1>Log In</h1></Grid>
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
                            <h3>Log In with E-Mail</h3>
                            <Box width={1}>
                                <form autoComplete="off" noValidate onSubmit={formSubmitHandler}>
                                    <TextField 
                                        variant = "outlined"
                                        label = "Email"
                                        name = "email"
                                        fullWidth
                                        className = {classes.root}
                                        onChange = {(e)=>fieldChangeHandler('email',e)}
                                        error = {state.validation.emailValid===false ? true:false}
                                        helperText = {state.validation.emailValid===false ? "Invalid Email" :'' }
                                        />
                                    <TextField 
                                        variant = "outlined"
                                        label = "Password"
                                        name = "password"
                                        type = 'password'
                                        fullWidth
                                        className = {classes.root}
                                        onChange = {(e)=>fieldChangeHandler('password',e)}
                                        error = {state.validation.passwordValid===false ? true:false}
                                        helperText = {state.validation.passwordValid===false ? "Invalid Password" : ''}
                                        />
                                    <Button className={classes.submitButton} width={1} type="submit" >Submit</Button>
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
export default Login;