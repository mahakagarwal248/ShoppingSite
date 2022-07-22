import express from 'express';
import multer from 'multer';
import { postImage } from '../controllers/Images.js';
const router = express.Router();
import fs from 'fs'
const upload = multer({ dest:'../uploads'  });

const uploadFile = async (req, res, next) => {
    const data = req.body.data;
    console.log(data);
    
    try {
        upload.single('file')
        res.send('success')

        var file = fs.writeFile('file.png', data, function (err) {
        if (err) throw err;
        });
        res.send(file)
        next();
    } catch (error) {
        console.log(error);
    }
}


router.post('/postImage/:id', uploadFile, postImage);


// router.post('/postImage/:id',  postImage);

export default router;