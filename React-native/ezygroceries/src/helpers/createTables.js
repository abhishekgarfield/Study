import schema from "./schema"

const createAllTables = async ()=>{
    await schema.createEmployeeTable()
}
export default createAllTables;
