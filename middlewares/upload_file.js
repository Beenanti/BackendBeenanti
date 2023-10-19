const multer  = require('multer');
const path = require('path');

// -----------------------multer----------------------
function createMulterStorage(destination, maxFileSize, allowedMimeTypes) {
  const fileStorage = multer.diskStorage({
      destination: (req, file, cb) => {
          cb(null, path.join(__dirname, destination));
      },
      filename: (req, file, cb) => {
          console.log(file);
          cb(null,  Date.now().toString() + '_' + file.originalname)
      }
  })

  const fileFilter = (req, file, cb) => {
      if(allowedMimeTypes.includes(file.mimetype)) {
          cb(null, true)
      }else{
          cb(null, false)
      }
  }

  return multer({
      storage: fileStorage,
      limits: {
          fileSize: maxFileSize
      },
      fileFilter: fileFilter
  })

}

module.exports = createMulterStorage;
