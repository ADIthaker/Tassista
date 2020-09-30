  
import React, { createContext, useState, useEffect } from "react";

export const userContext = createContext(null);


const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setAuth] = useState(false);
  const [type, setType] = useState("user");
  const token = localStorage.getItem('token');
  //console.log(token);
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
  console.log(options);
  const getUser  = async () => {
    const url = "http://localhost:4000/userinfo";
    try{
      const userJ = await fetch(url,
        options
      );
      const user = await userJ.json();
      console.log(user, "data from fetch");
      if(user.hasOwnProperty('authorizedData')){
        if(user.authorizedData.hasOwnProperty('user')){
          setUser(user.authorizedData.user);
        } else {
          setUser(user.authorizedData.driver);
        }
        
      } else{
        setUser(user);
      } 
      setAuth(true);
    } catch (err){
      console.log(err);
    }
  }
  useEffect(()=>{
    getUser();
  },[]);
  return (
      <userContext.Provider value={{
          user: user,
          setAppAuth: setUser,
          isAuth: isAuth,
          setAuth: setAuth,
      }}>
          {children}
      </userContext.Provider>
  );
};


export default UserProvider;





//   const getProfile = async () => {
//     const resp = await fetch('http://localhost:4000/profile',{
//             method: 'GET',
//             withCredentials: true,
//             credentials: 'include',
//             headers: {
//               'Accept': 'application/json',
//               'Content-Type': 'application/json'
//         }});
//     const respJson  = await resp.json();
//     await setUser(respJson);    
// }
// useEffect(() => {
//   getProfile();
// }, []);