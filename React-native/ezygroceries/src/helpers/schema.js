import { createTable } from "../config/sqlite"
import models from "./models"
import tables from "./tables"

const createEmployeeTable = async () => {
    await createTable(tables.EmployeeTable,models.employeeFields)
}

export default {createEmployeeTable}
