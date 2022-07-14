import mongoose from 'mongoose'
import cart from "../models/cart.js";

export const addToCart = async (req, res) => {
    const {id: _id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('product unavailable...')
    }

    const {productData} = req.body;
    const {name, description, brand, price, quantity, userId} = productData
    const addProductToCart = new cart({name, description, brand, price, quantity, userId});

    try {
        await addProductToCart.save();
        res.status(200).json("Added to cart successfully")
    } catch (error) {
        res.status(400).json("Couldn't add product to cart")
    }
}