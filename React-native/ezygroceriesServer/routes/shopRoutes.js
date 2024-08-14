import express from 'express';
import shopController from '../controllers/shopController.js';



const router = express.Router();

router.get('/getallshops',shopController.allShops);


export {router as shopRoutes}
