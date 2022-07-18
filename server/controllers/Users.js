import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import buffer from 'buffer'

import users from '../models/user.js'

export const signup = async (req,res) => {
    const {name, email, password, mobile, address} = req.body;
    try {
        const existingUser = await users.findOne({email});
        if(existingUser){
            alert("User already exist");
            return res.status(404).json({message: "User already exist"});
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await users.create({name, email, password: hashedPassword, mobile, address});
        const token = jwt.sign({email: newUser.email, id:newUser._id}, process.env.JWT_SECRET, {expiresIn:'1h'})
        res.status(200).json({result: newUser, token})

    } catch (error) {
        res.status(500).json({message:"Something went wrong..."});
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;
    // const encodedText = buffer.Buffer.from(email).toString('base64')
    // console.log(encodedText)
    // const decodedText = buffer.Buffer.from(encodedText, 'base64').toString('ascii')
    // console.log(decodedText)
    try {
        const existingUser = await users.findOne({email});
        if(!existingUser){
            return res.status(404).json({message: "User don't exist"});
        }

        const isPasswordCrt = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCrt){
            return res.status(400).json({message:"Wrong Password"})
        }

        const token = jwt.sign({email: existingUser.email, id:existingUser._id}, process.env.JWT_SECRET ,{expiresIn:'1h'})
        res.status(200).json({result: existingUser, token})
    } catch (error) {
        res.status(500).json("Something went wrong...");
    }
}
