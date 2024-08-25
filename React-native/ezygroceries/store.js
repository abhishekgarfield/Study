import {createContext, useState} from 'react';
export const DataContext =  createContext();
const AppDataStore = ({children}) => {
  const [currentUser, setCurrentUser] = useState({});
  return (
    <DataContext.Provider value={{currentUser,setCurrentUser}}>
        {children}
    </DataContext.Provider>
  )

};

export let contextInstance = null;

export function setContextInstance(instance) {
  contextInstance = instance;
}



export default AppDataStore;
