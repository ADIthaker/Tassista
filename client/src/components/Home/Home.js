import React , {Fragment, useEffect, useContext, useState} from 'react';
import useData from '../../hooks/useData';
import {userContext} from '../../contexts/userContext';
import useStyles from './HomeStyles';
import bgImg from '../../assets/images/bg-978.jpg';

const Home = (props) => {
    const classes = useStyles();
    const context = useContext(userContext);
    const getProfile = async () => {
        const resp = await fetch('http://localhost:4000/profile',{
                method: 'GET',
                withCredentials: true,
                credentials: 'include',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
            }});
        const respJson  = await resp.json();
        await context.setUser(respJson);
        context.getUser(); 
        }  
    
    useEffect(()=>{
        getProfile();
        // to get user after every re-render or if its a redirect from the oauth page
    }, []);
    
    if(context.user.user === undefined){
        return (<div>Loading ...</div>);
    } else {
        return(
            <div className={classes.main} >
                <img src={bgImg} className={classes.img}/>
                <p>{context.user.user.email}</p>
                <p>:/</p>
            </div>
           
        );
    }
    
}
export default Home;