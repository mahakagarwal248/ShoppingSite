import mongoose from 'mongoose'
import cart from "../models/cart.js";
import products from '../models/products.js'

export const addToCart = async (req, res) => {
    const {id: _id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('product unavailable...')
    }

    const productData = req.body;
    const addProductToCart = new cart(productData);

    try {
        await addProductToCart.save();
        res.status(200).json("Added to cart successfully")
    } catch (error) {
        res.status(400).json("Couldn't add product to cart")
    }
}