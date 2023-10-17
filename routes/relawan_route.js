const express = require("express");
const router = express.Router();
const {authenticateUser} = require('../middlewares/authentication');
const {isMiminMaster, isMiminPanti} = require('../middlewares/authorization')
const relawanController = require("../controllers/relawan_controller");
const createMulterStorage = require('../middlewares/upload_file')

const upload_berkas_relawan = createMulterStorage(
    '../uploads/berkas_kunjungan',                              //destinasi folder
    1024 * 1024 * 5,                                            //batas ukuran file
    ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf'] //tipe mime file
);

router.post('/tambah', authenticateUser, upload_berkas_relawan.single('berkas'), relawanController.pengajuan);
router.get('/riwayat', relawanController.riwayat);
router.get('/data', relawanController.lihat_data);
router.post('/verifikasi', relawanController.verifikasi);

module.exports = router