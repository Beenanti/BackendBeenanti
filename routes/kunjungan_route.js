const express = require("express");
const router = express.Router();
const {authenticateUser} = require('../middlewares/authentication');
const {isMiminMaster, isMiminPanti} = require('../middlewares/authorization')
const kunjunganController = require("../controllers/kunjungan_controller");
const createMulterStorage = require('../middlewares/upload_file')

const upload_berkas_kunjungan = createMulterStorage(
    '../uploads/berkas_kunjungan',                              //destinasi folder
    1024 * 1024 * 3,                                            //batas ukuran file
    ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf'] //tipe mime file
);

router.get('/', kunjunganController.lihatData);
router.get('/riwayat', kunjunganController.riwayat);
router.get('/panti/:id_panti', kunjunganController.lihatDataPanti);
router.get('/:id_kunjungan', kunjunganController.detail);
router.patch('/:id_kunjungan/verifikasi', kunjunganController.verifikasi);
router.post('/tambah', authenticateUser, upload_berkas_kunjungan.single('berkas'), kunjunganController.pengajuan);

module.exports = router
