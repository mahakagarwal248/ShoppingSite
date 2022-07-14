import express from 'express';

import { addToWishlist, getWishlistProduct } from '../controllers/Wishlist.js';

const router = express.Router();

router.post('/addToWishlist/:id', addToWishlist);
router.get('/getWishlistProduct/:id', getWishlistProduct);

export default router;