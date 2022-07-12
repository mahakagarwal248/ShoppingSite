import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import users from '../models/user.js'

export const signup = async (req,res) => {
    const {name, email, password, mobile, address} = req.body;
    try {
        const existingUser = await users.findOne(email);
        if(existingUser){
            alert("User already exist");
            return res.status(404).json({message: "User already exist"});
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = users.create({name, email, password: hashedPassword, mobile, address});
        const token = jwt.sign({email: newUser.email, id:newUser._id}, process.env.JWT_SECRET, {expiresIn:'1h'})
        res.status(200).json({result: newUser, token})

    } catch (error) {
        res.status(500).json({message:"Something went wrong..."});
    }
}