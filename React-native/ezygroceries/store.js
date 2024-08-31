import {createContext, useEffect, useState} from 'react';
export const DataContext =  createContext();
const AppDataStore = ({children}) => {
  const [currentUser, setCurrentUser] = useState({});
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(()=>{
    let sum=0;
    items.forEach((element) => {
      sum = sum + parseInt(element.price);
    })
    setTotal(sum)
  },[items])
  return (
    <DataContext.Provider value={{currentUser,setCurrentUser,items, setItems, total}}>
        {children}
    </DataContext.Provider>
  )

};

export let contextInstance = null;

export function setContextInstance(instance) {
  contextInstance = instance;
}



export default AppDataStore;
