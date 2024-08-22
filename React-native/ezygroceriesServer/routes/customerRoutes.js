import express from 'express';
import employeeController from '../controllers/employeeController.js';



const router = express.Router();

router.get('/getallcustomers',employeeController.allEmployees);
router.post("/login", employeeController.employeeLogin)
router.post("/signup", employeeController.employeeSignup)
router.post("/verifyotp", employeeController.verifyOtp)
router.post("/resendotp", employeeController.resendOtp)


export {router as employeeRoutes}
