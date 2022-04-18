import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{cb(null, './uploads')},
    filename: (req, file, cb)=>{cb(null, file.originalname)}
});

const filter = (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('only images allowed'), false)
    }
}

const imageUpload = multer({
    storage: storage,
    limits: {fileSize: 1024 * 1024 * 3},
    fileFilter: filter
}).single('image');

export default imageUpload;