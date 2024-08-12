import mysql2 from 'mysql2';
import * as dotenv from "dotenv"

dotenv.config();

const db = mysql2.createPool({
    user:DATABASE_USER,
    password:DATABASE_PASSWORD,
    database:DATABASE_NAME,
    host: DATABASE_HOST
}).promise()

export default db;
