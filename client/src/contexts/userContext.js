  
import React, { createContext, useState, useEffect } from "react";

export const userContext = createContext(null);

const token = localStorage.getItem('token');

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setAuth] = useState(false);
  // const [loading, setLoading] = useState(false);
  console.log(user,"user");
  const getUser  = async () => {
    const url = "http://localhost:4000/userinfo";
    const userJ = await fetch(url,
      {
        credentials:"include",
        withCredentials:true,
        headers:{
          'Authorization': "Bearer "+token //check this
        }
    });
    const user = await userJ.json();
    setUser(user);
    setAuth(true);
    //console.log(user,"from oauth in contextjs");
    // setData('oauth',user);
  }
  useEffect(()=>{
    getUser();
  },[]);
  const setData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
    setUser(data);
  };
  // const getData = (key) => {
  //   let data = localStorage.getItem(key);
  //   data = JSON.parse(data);                    // forces re render by changing state
  //   return data;
  // };

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