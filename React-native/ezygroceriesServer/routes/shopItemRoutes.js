import express from 'express';
import shopItemController from '../controllers/shopItemController.js';

const router = express.Router();

router.get('/allshopItems',shopItemController.getShopItems)
router.post('/updateavailability',shopItemController.updateIsAvailable)
router.post('/editshopitem',shopItemController.editShopItem);
router.post('/createshopitem',shopItemController.createShopItem);
router.post('/deleteshopitem',shopItemController.deleteShopItem);




export  {router as shopItemRoutes}
