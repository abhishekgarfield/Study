import express from 'express';
import { employeeRoutes } from './routes/employeeRoutes.js';
import * as dotenv from 'dotenv';
import loggerMiddleware from './middlewares/common/loggerMiddleware.js';
import authMiddleware from './middlewares/common/authMiddleware.js';
import errorMiddleware from './middlewares/common/errorMiddleware.js';
import { shopRoutes } from './routes/shopRoutes.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;


// for logging requests
app.use(loggerMiddleware);

// for authentication
app.use(authMiddleware);

// Built-in middleware for parsing JSON request bodies
app.use(express.json());

// Built-in middleware for parsing URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/employees",employeeRoutes)
app.use("/shops",shopRoutes)

// error handing middleware
app.use(errorMiddleware)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
