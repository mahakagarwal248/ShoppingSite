import express from 'express';
import {getAllProducts, addProducts} from '../controllers/Products.js';

const router = express.Router();

router.post('/addProduct', addProducts)
router.get('/getAllProducts', getAllProducts);

export default router