const express = require("express");
const router = express.Router();
const {authenticateUser} = require('../middlewares/authentication');
const {isMiminMaster, isMiminPanti} = require('../middlewares/authorization')
const relawanController = require("../controllers/relawan_controller");
const createMulterStorage = require('../middlewares/upload_file')

const upload_berkas_relawan = createMulterStorage(
    '../uploads/berkas_relawan',                              //destinasi folder
    1024 * 1024 * 3,                                            //batas ukuran file
    ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf'] //tipe mime file
);

router.get('/', relawanController.lihatData);
router.get('/panti/:id_panti', relawanController.lihatDataPanti);
router.post('/request', authenticateUser, upload_berkas_relawan.single('berkas'), relawanController.pengajuan);
router.post('/verifikasi', relawanController.verifikasi);
router.patch('/:id_relawan/verifikasi', relawanController.verifikasi);

module.exports = router
