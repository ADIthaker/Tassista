import React , {Fragment, useEffect, useContext, useState} from 'react';
import useData from '../../hooks/useData';
import {userContext} from '../../contexts/userContext';

const Home = (props) => {
    // const jsonUser = JSON.parse(userData.user);
    const context = useContext(userContext);
    // console.log(context.user.user);
    // const [setData, getData, user] = useData();
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
       //console.log(respJson);  
        }  
    
    useEffect(()=>{
        // setUser(context.user)
        getProfile();
        // to get user after every re-render or if its a redirect from the oauth page
    }, []);
    //console.log(context.user, "getting data");
    if(context.user.user === undefined){
        return (<div>Loading ...</div>);
    } else {
        return(
            <div>
                <p>{context.user.user.email}</p>
                <h1>Literally anything else!!</h1>
            </div>
           
        );
    }
    
}
export default Home;