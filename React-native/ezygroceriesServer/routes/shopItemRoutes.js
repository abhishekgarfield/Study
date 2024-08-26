import express from 'express';
import shopItemController from '../controllers/shopItemController.js';

const router = express.Router();

router.get('/allshopItems',shopItemController.getShopItems)
router.post('/updateavailability',shopItemController.updateIsAvailable)


export  {router as shopItemRoutes}
