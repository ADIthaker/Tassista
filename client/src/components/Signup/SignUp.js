import React,{useReducer,} from 'react';
import {Grid, TextField, Box, Button, Avatar, FormHelperText} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Glogo from '../../google-hangouts.svg';
import useStyles from './SignUpStyles';
import axios from 'axios';


const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const usernameRegex = /\w \w/;
const passwordRegex = /^[A-Za-z]\w{7,14}$/;
const initialState = {
    emailValue:'',
    usernameValue:'', 
    passwordValue:'',
    validation:{
        emailValid:true,
        passwordValid:true,
        usernameValid:true
    }
    
};
const reducer = (state, action)=>{
    switch(action.type) {
        case 'emailChange':
            return {... state, emailValue : action.payload };
        case 'usernameChange':
            return {... state, usernameValue : action.payload };
        case 'passwordChange':
            return {... state, passwordValue : action.payload };
        case 'validation':
            return {... state, validation : action.settings};
    }
    
}

const SignUp = () => {
    
    const [state, dispatch] = useReducer(reducer, initialState);
    const classes = useStyles();
    const fieldChangeHandler = (name,event) =>{
        let emailTest = state.validation.emailValid;
        let passwordTest = state.validation.passwordValid;
        let usernameTest = state.validation.usernameValid;
        if(name==='email') {
             emailTest = emailRegex.test(event.target.value);
        } else if(name==='password'){
             passwordTest = passwordRegex.test(event.target.value);
        } else if(name==='username'){
             usernameTest = usernameRegex.test(event.target.value);
        }
        dispatch({type:'validation',
            settings:{
                emailValid:emailTest,
                passwordValid:passwordTest,
                usernameValid:usernameTest,
            }
        })
        const typeToPass = name + 'Change';
        dispatch({type: typeToPass ,payload:event.target.value}); 
    }
    console.log(state);

    const formSubmitHandler = (event)=>{
        event.preventDefault();
        axios.post('http://localhost:4000/register',
        {
            email:state.emailValue,
            password:state.passwordValue,
            username:state.usernameValue,
        })
        .then(r=>console.log(r,'submit'));

    }

    const googleSignUpHandler = (event) => {
        console.log(event);
    }
    return(
        <Box className={classes.main} >
            <Grid container >
                <Grid item sm={3} md={4}  />
                <Grid item sm={6} md={4}  className={classes.form}>
                    <Grid container direction="column" spacing={3}>
                        <Grid item ><h1>Sign Up</h1></Grid>
                        <Grid item  style={{justifyContent: 'center',padding:'auto'}}>
                            <Button className={classes.gButton} onClick={googleSignUpHandler} >
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
                                <form autoComplete="off" noValidate onSubmit={formSubmitHandler}>
                                    <TextField 
                                        variant = "outlined"
                                        label="Full Name"
                                        name = "username"
                                        fullWidth
                                        onChange = {(e)=>fieldChangeHandler('username',e)}
                                        className = {classes.root}
                                        error = {state.validation.usernameValid===false ?  true:false }
                                        helperText = {state.validation.usernameValid===false ? "Invalid Name" : ''}
                                        />
                                
                                    <TextField 
                                        variant = "outlined"
                                        label = "Email"
                                        name = "email"
                                        fullWidth
                                        onChange = {(e)=>fieldChangeHandler('email',e)}
                                        className = {classes.root}
                                        error = {state.validation.emailValid===false ? true:false}
                                        helperText = {state.validation.emailValid===false ? "Invalid Email" :'' }
                                        />
                                    <TextField 
                                        variant = "outlined"
                                        label = "Password"
                                        name = "password"
                                        type="password"
                                        fullWidth
                                        onChange = {(e)=>fieldChangeHandler('password',e)}
                                        className = {classes.root}
                                        error = {state.validation.passwordValid===false ? true:false}
                                        helperText = {state.validation.passwordValid===false ? "Invalid Password" : ''}
                                        />
                                    <Button className={classes.submitButton} width={1} type="submit">Submit</Button>
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