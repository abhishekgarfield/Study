import express from 'express';
import shopController from '../controllers/shopController.js';



const router = express.Router();

router.get('/getallshops',shopController.allShops);
router.get('/getavailableshops',shopController.getAvailableShop);

router.post('/getshop',shopController.getShop);






export {router as shopRoutes}
