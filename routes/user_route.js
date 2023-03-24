const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");
const multer  = require('multer')
const path = require('path')
const {authenticateUser} = require('../middlewares/authentication')


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

const upload = multer({
    storage: fileStorage,
    limits: {
      fileSize: 1024 * 1024 * 2
    },
    fileFilter: fileFilter
})


router.get('/', userController.listDataUser);
router.get('/profil',authenticateUser, userController.lihatProfil);
router.patch('/profil/edit', authenticateUser , userController.editProfil);
router.get("/admin-panti", userController.listAdminPanti);
router.get("/admin-panti/:email", userController.detailAdminPanti);
router.post("/admin-panti/register", userController.registerAdminPanti);
router.patch("/admin-panti/:email/edit", userController.editAdminPanti);
router.patch('/:email/upload-pp', upload.single('foto'), userController.tambahFotoUser)

module.exports = router