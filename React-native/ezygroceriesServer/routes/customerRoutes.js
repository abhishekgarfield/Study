import express from 'express';
import customerController from '../controllers/customerController.js';



const router = express.Router();

router.get('/getallcustomers',customerController.allcustomers);
router.post("/login", customerController.customerLogin)
router.post("/signup", customerController.customerSignup)
router.post("/verifyotp", customerController.verifyOtp)
router.post("/resendotp", customerController.resendOtp)


export {router as customerRoutes}
