import React , {Fragment, useEffect, useContext} from 'react';
import useData from '../../hooks/useData';

const Home = (props) => {
    // const jsonUser = JSON.parse(userData.user);
    const [setData, getData, user] = useData();
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
        await setData(respJson);
        getData();
        //console.log(respJson);    
    }
    useEffect(()=>{
        getProfile(); // to get user after every re-render or if its a redirect from the oauth page
    }, []);
    console.log(user.user, "getting data");
    if(user.user === undefined){
        return (<div>Loading ...</div>);
    } else{
        return(
            <div>
               <p>{user.user.email}</p>
                <h1>Literally anything else!!</h1>
            </div>
           
        );
    }
    
}
export default Home;