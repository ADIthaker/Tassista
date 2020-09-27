  
import React, { createContext, useState, useEffect } from "react";

export const userContext = createContext(null);


const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  // const [loading, setLoading] = useState(false);
  //console.log(user,"from context");
  const setData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
    setUser(data);
  };
  const removeData = (key) => {
    localStorage.removeItem(key);
    setUser(null);
  }
  const getData = (key) => {
    let data = localStorage.getItem(key);
    data = JSON.parse(data);                    // forces re render by changing state
    return data;
  };

  return (
      <userContext.Provider value={{
          user: user,
          setUser: setData,
          getUser: getData,
          removeUser: removeData
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