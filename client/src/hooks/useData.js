import {useState} from 'react';

const useData = () => {
  const [user, setUser] = useState({});
    
  const setData = (data) => {
    sessionStorage.setItem('myData', JSON.stringify(data));
    //console.log(data, "from setData");
  };

  const getData = () => {
    let data = sessionStorage.getItem('myData');
    data = JSON.parse(data);
    setUser(data);
  };

  return [setData, getData, user];
};
export default useData;