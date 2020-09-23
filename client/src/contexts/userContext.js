  
import React, { createContext, useState, useEffect } from "react";
import useData from '../hooks/useData';
export const userContext = createContext(null);


const UserProvider = ({ children }) => {
  const [setData, getData, user] = useData({});
  console.log(user,"from context");
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
  useEffect(() => {
    getProfile();
  }, []);

  return (
      <userContext.Provider value={{
          user: user,
          setUser: setData,
          getUser: getData,
      }}>
          {children}
      </userContext.Provider>
  );
};


export default UserProvider;