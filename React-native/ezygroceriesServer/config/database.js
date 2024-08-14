import mysql2 from 'mysql2';
import * as dotenv from "dotenv"

dotenv.config();

const db = mysql2.createPool({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST
})

export default db;
