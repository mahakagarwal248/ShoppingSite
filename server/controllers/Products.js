import products from '../models/products.js';

export const addProducts = async (req, res) => {
    const productData = req.body;
    const newProduct = new products(productData);
    try {
        await newProduct.save();
        res.status(200).json("Added a new product successfully")
    } catch (error) {
        res.status(400).json("Couldn't added a new product")
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const productList = await products.find();
        res.status(200).json(productList);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}