import React,{useEffect, useState, useContext, useRef, useCallback} from 'react';
import {Container, Button} from '@material-ui/core';
import axios from 'axios';
import {userContext} from '../../contexts/userContext';
import ReqCard from './RequestsCard';
const Requests = () => {
    const context = useContext(userContext);
    const [isLoading,setLoading] = useState(false);
    const [reqs,setReqs] = useState([]);
    const mountedRef = useRef(true)
    const getReqs = useCallback(async () =>{
        setLoading(true);
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
        const url = "http://localhost:4000/request";
        try{
            const resp = await axios.get(url,options);
            if (!mountedRef.current) return null
            setReqs(resp.data);
            setLoading(false);
            console.log(resp);
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
        
    });
    useEffect(()=>{
        getReqs();
        return () => { 
            mountedRef.current = false
          }
    },[]);
    if(context.isLoading){
        return null;
    }
    return( <Container>
                {reqs.map(req => <ReqCard 
                                    key={req._id}
                                    timeStamp={req.timeOfArrival.slice(11,19)}
                                    dateStamp={req.timeOfArrival.slice(0,10)}
                                    dropLocation={req.dropAddress.split(',').slice(0,3)}
                                    pickupLocation={req.pickupAddress.split(',').slice(0,3)}
                                    city={req.pickupAddress.split(',').slice(-3,-2)}
                                    luxury={req.luxury}
                                    paymentMethod={req.paymentMethod}
                                    />)
                }
            </Container>
    )
}

export default Requests;