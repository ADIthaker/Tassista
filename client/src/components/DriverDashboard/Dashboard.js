import React,{useContext, useEffect,useReducer,useState} from 'react';
import {TextField, Button, Toolbar,Typography, Box, Container, Avatar, Grid,useMediaQuery} from '@material-ui/core';
import {userContext} from '../../contexts/userContext';
import  useStyles from "./DashboardStyles";
import { useHistory, Redirect } from 'react-router-dom';
import StarIcon from '@material-ui/icons/Star';
import axios from 'axios';

const usernameRegex = /\w \w/;
const phoneNoRegex = /^[0-9]{10}$/;
const initialState = {
    usernameValue:'', 
    phoneNoValue:'',
    addressValue:'', 
    validation:{
        usernameValid:true,
        phoneNoValid:true,
        addressValid:true,
    }
    
};
const reducer = (state, action)=>{
    switch(action.type) {
        case 'usernameChange':
            return {... state, usernameValue : action.payload };
        case 'phoneNoChange':
            return {...state, phoneNoValue: action.payload};
        case 'addressChange':
            return {...state, addressValue: action.payload};
        case 'validation':
            return {... state, validation : action.settings};
        
    }
    
}

const Dashboard = (props) => {

    const classes = useStyles();
    const context = useContext(userContext);
    const [state, dispatch] = useReducer(reducer, initialState);
    const [isEdit, setEdit] = useState(false);
    const [file, setFile] = useState(null);
    const formdata = new FormData();
    const setInitialFormState = () => {
        ['phoneNo','username','address'].map(name=>{
            const typeToPass = name + 'Change';
            dispatch({type: typeToPass ,payload: context.user[name]});
        })
         
    }
    const fileChangeHandler = (event)=>{
        setFile(event.target.files[0]);
    }
    const updateFormSubmitHandler = async () => {
        const token = localStorage.getItem('token');
        let options = {
            credentials:"include",
            withCredentials:true,
        };
        if(token){
            options = {
            credentials:"include",
            withCredentials:true,
            headers:{
                'Authorization': "Bearer "+token,
            }
        };
        }
        formdata.append('email',context.user.email);
        formdata.append('address',state.addressValue);
        formdata.append('phoneNo',state.phoneNoValue);
        formdata.append('username',state.usernameValue);
        formdata.append('file',file);
        // const data = {
        //     email:context.user.email,
        //     address:state.addressValue,
        //     phoneNo:state.phoneNoValue,
        //     username:state.usernameValue,
        // };
        const url = "http://localhost:4000/driver/profile/update";
        const resp = await axios.post(url,formdata,options);
        console.log(resp);
        setEdit(false);
    }
    const fieldChangeHandler = (name,event) =>{
        let usernameTest = state.validation.usernameValid;
        let phoneNoTest = state.validation.phoneNoValid;
        if(name==='username'){
             usernameTest = usernameRegex.test(event.target.value);
        } else if(name==='phoneNo'){
             phoneNoTest = phoneNoRegex.test(event.target.value);
        }
        dispatch({type:'validation',
            settings:{
                usernameValid:usernameTest,
                phoneNoValid:phoneNoTest,
                addressValid:true
            }
        })
        const typeToPass = name + 'Change';
        dispatch({type: typeToPass, payload: event.target.value}); 
    }
    console.log(state);
    if(context.user === null && context.isLoading!== true){
        return (<Redirect to="/" />);
    }
    else if(context.isLoading){
        return null;
    } 
    else {
        if(isEdit){
            return (
                <Container maxWidth="md" className={classes.main}>
                <div className={classes.overlay}></div>
                <Grid container>
                   <Grid  item md={4}>
                    <Grid  container style={{position:"relative",
                            top:'-100px',
                            alignItems:"center",
                        }}>
                        <Grid item md={12}>
                        <Avatar src={'http://localhost:4000/'+context.user.picture} className={classes.profile}/>
                        </Grid>
                        <Grid item md={12}>
                        <Typography className={classes.title}>
                            {context.user.username}
                        </Typography>
                        </Grid>
                    </Grid>
                    </Grid>
                    <Grid item md={8}>
                        <form onSubmit={updateFormSubmitHandler}>
                            <TextField 
                            label="Phone Number"
                            name="phoneNo"
                            defaultValue={context.user.phoneNo}
                            error = {state.validation.phoneNoValid===false ?  true:false }
                            helperText = {state.validation.phoneNoValid===false ? "Invalid phone number" : ''}
                            onChange = {(e)=>fieldChangeHandler('phoneNo',e)} /><br />
                            <TextField 
                            label="Address"
                            name="address"
                            defaultValue = {context.user.address}
                            onChange ={(e)=>fieldChangeHandler('address',e)}  /><br />
                            <TextField 
                            label="Name"
                            name="username"
                            defaultValue = {context.user.username}
                            onChange ={(e)=>fieldChangeHandler('username',e)}
                            error = {state.validation.usernameValid===false ?  true:false }
                            helperText = {state.validation.usernameValid===false ? "Invalid Name" : ''} /><br />
                            <Button
                                variant="contained"
                                component="label"
                                >
                                Upload File
                                <input
                                    type="file"
                                    style={{ display: "none" }}
                                    onChange = {(e)=>fileChangeHandler(e)}
                                />
                            </Button>
                            <Button type="submit">Finish Edit</Button>
                        </form>
                    </Grid>
                </Grid>
            </Container>
            )
        }
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
                        <Avatar src={'http://localhost:4000/'+context.user.picture} className={classes.profile}/>
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
                        <Button onClick={()=>{setEdit(true);setInitialFormState();}} >Edit Profile</Button>
                    </Grid>
               </Grid>        
            </Container>
        );
    }
    
}

export default Dashboard;