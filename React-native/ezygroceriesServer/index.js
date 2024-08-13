import express from 'express';
import * as dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
import db from './config/database.js';

app.get("/", (req, res) => {
    console.log("---hello----");

    return db.query('SELECT * FROM user_roles;', [], (err, results, fields) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('Internal Server Error');
        }

        // Log results and fields
        console.log(results); // results contains rows returned by the server
        console.log(fields); // fields contains extra metadata about results, if available

        // Send response
        res.send("---ss-s-");
    });
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
