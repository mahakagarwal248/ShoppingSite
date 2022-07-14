import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoutes from './routes/user.js';
import productRoutes from './routes/products.js';
import cartRoutes from './routes/cart.js';
import wishlistRoutes from './routes/wishlist.ja'

const app = express();
dotenv.config();
app.use(express.json({limit:"30mb" , extended:true}))
app.use(express.urlencoded({limit:"30mb" , extended:true}))
app.use(cors());

app.get('/',(req,res)=>{
    res.send("This is a stack overflow clone API");
})

app.use('/user',userRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/wishlist', wishlistRoutes);

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.CONNECTION_URL;

mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)))
    .catch((err) => console.log(err.message));