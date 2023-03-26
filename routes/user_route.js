const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");
const {upload_pp} = require('../middlewares/upload_file')
const {isMiminMaster} = require('../middlewares/authorization')
const {authenticateUser} = require('../middlewares/authentication')

router.get('/profil', authenticateUser, userController.lihatProfil);
router.patch('/profil/edit', authenticateUser, userController.editProfil);
router.post('/ubah-sandi', authenticateUser, userController.ubahPassword);
router.patch('/upload-pp', authenticateUser, upload_pp.single('foto'), userController.tambahFotoUser);

router.get('/', authenticateUser, isMiminMaster, userController.listDataUser);
router.get("/admin-panti", authenticateUser, isMiminMaster, userController.listAdminPanti);
router.get("/admin-panti/:email", authenticateUser, isMiminMaster, userController.detailAdminPanti);
router.post("/admin-panti/register", authenticateUser, isMiminMaster, userController.registerAdminPanti);
router.patch("/admin-panti/:email/edit", authenticateUser, isMiminMaster, userController.editAdminPanti);
router.patch('/:email/upload-pp', authenticateUser, isMiminMaster, upload_pp.single('foto'), userController.tambahFotoAdminPanti);

module.exports = router;