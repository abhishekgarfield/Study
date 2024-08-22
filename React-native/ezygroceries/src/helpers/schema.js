import { createTable } from "../config/sqlite"
import models from "./models"
import tables from "./tables"

const createUserTable = async () => {
    await createTable(tables.UserTable,models.employeeFields)
}

export default {createUserTable}
