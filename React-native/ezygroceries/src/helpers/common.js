import { deleteTable } from "../config/sqlite";
import { navigate } from "./navigation"
import tables from "./tables"

export const handleAuthTokenError = () =>{
    logOut();
}

export const logOut = () => {
    deleteTable(tables.UserTable).then((res)=>{
        contextInstance.setCurrentUser({});

    })
}
