import React , {Fragment,useEffect} from 'react';

const Home = ()=>{
    useEffect(()=>{
        console.log('called again');
        fetch('http://localhost:4000/profile',{
                method: 'GET',
                withCredentials: true,
                credentials: 'include',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
            }})
            .then(j=>j.json())
            .then(r=>console.log(r));
        
    },[]);
    return(
        <h1>Hello</h1>
    )
}
export default Home;