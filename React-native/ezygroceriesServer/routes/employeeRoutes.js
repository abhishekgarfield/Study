import express from 'express';
import employeeController from '../controllers/employeeController.js';



const router = express.Router();

router.get('/getallemployees',employeeController.allEmployees);
router.get("/login", employeeController.employeeLogin)
router.post("/signup", employeeController.employeeSignup)
router.post("/verifyotp", employeeController.verifyOtp)
router.post("/resendotp", employeeController.resendOtp)


export {router as employeeRoutes}
