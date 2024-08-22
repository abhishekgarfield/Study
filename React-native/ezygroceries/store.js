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



export default AppDataStore;
