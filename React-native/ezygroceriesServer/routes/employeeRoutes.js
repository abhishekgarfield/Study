import express from 'express';
import employeeController from '../controllers/employeeController.js';



const router = express.Router();

router.get('/getAllemployees',employeeController.allEmployees);
router.get("/login")

export {router as employeeRoutes}
