const express = require("express");
const router = express.Router();
const {authenticateUser} = require('../middlewares/authentication');
const {isMiminMaster, isMiminPanti} = require('../middlewares/authorization')
const kunjunganController = require("../controllers/kunjungan_controller");
const createMulterStorage = require('../middlewares/upload_file')

const upload_berkas_kunjungan = createMulterStorage(
    '../uploads/berkas_kunjungan',                              //destinasi folder
    1024 * 1024 * 5,                                            //batas ukuran file
    ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf'] //tipe mime file
);

router.post('/tambah', authenticateUser, upload_berkas_kunjungan.single('berkas'), kunjunganController.pengajuan);
router.get('/riwayat', kunjunganController.riwayat);
router.get('/data', kunjunganController.lihat_data);
router.post('/verifikasi', kunjunganController.verifikasi);

module.exports = router
