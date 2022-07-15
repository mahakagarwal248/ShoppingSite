import express from 'express';

import { addToCart, deleteProductFromCart, getCartProduct } from '../controllers/Cart.js';

const router = express.Router();

router.post('/addToCart/:id', addToCart);
router.get('/getCartProduct/:id', getCartProduct);
router.patch('/deleteProduct/:id' , deleteProductFromCart);

export default router;