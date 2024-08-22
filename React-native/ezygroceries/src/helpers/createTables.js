import schema from "./schema"

const createAllTables = async ()=>{
    await schema.createUserTable()
}
export default createAllTables;
