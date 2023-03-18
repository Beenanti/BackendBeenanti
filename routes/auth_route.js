const express = require("express");
const router = express.Router();
const multer  = require('multer')
const path = require('path')
const authController = require("../controllers/auth_controller");

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

const upload = multer({
    storage: fileStorage,
    limits: {
      fileSize: 1024 * 1024 * 2
    },
    fileFilter: fileFilter
})

router.post("/register-mobile", authController.registerMobile);
router.post("/register-mimin-master", authController.registerAdminMaster);
router.post("/register-mimin-panti", upload.single('foto'), authController.registerAdminPanti);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

module.exports = router