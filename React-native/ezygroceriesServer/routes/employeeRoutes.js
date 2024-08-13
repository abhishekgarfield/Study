import express from 'express';
import employeeController from '../controllers/employeeController.js';



const router = express.Router();

router.get('/employees',employeeController.allEmployees);

export {router as employeeRouter}
