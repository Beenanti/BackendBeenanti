const multer  = require('multer');
const path = require('path');

// -----------------------multer----------------------
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname,'../uploads/pp'));
    },
    filename: (req, file, cb) => {
      console.log(file);
      cb(null,  Date.now().toString() + '_' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || 
        file.mimetype === 'image/jpg' || 
        file.mimetype === 'image/jpeg') {
        cb(null, true)
    }else{
        cb(null, false)
    }
}

const upload_pp = multer({
    storage: fileStorage,
    limits: {
      fileSize: 1024 * 1024 * 2
    },
    fileFilter: fileFilter
})


module.exports = {upload_pp}