import express from 'express';
import memberShipController from '../controllers/membershipController.js';



const router = express.Router();

router.get('/shopmemberships',memberShipController.getshopMemberships)
router.get('/customermemberships',memberShipController.getCustomerMemberships)
router.post('/addmembership',memberShipController.addMembership)


export {router as membershipRoutes};
