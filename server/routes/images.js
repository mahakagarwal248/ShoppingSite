import express from 'express';
import multer from 'multer';
import { postImage } from '../controllers/Images.js';
const router = express.Router();
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
  
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})
var upload = multer({ storage: storage  });

// const uploadFile = async (req, res, next) => {
//     const data = req.body;
    
//     try {
//         upload.single('file')
//         res.send('success')
//         // var download = function(uri, filename, callback){
//         // request.head(uri, function(err, res, body){

//         //     request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
//         // });
//         // };

//         // download('https://www.google.com/images/srpr/logo3w.png', 'google.png', function(){
//         // console.log('done');
//         // });
    
//         next();
//     } catch (error) {
//         console.log(error);
//     }
// }


router.post('/postImage/:id',upload.single('file'), postImage);


// router.post('/postImage/:id',  postImage);

export default router;