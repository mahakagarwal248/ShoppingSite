import express from 'express';

import { addToCart, getCartProduct } from '../controllers/Cart.js';

const router = express.Router();

router.post('/addToCart/:id', addToCart);
router.get('/getCartProduct', getCartProduct);

export default router;