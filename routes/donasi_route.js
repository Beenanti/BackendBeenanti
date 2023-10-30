const express = require("express");
const router = express.Router();
const donasiController = require("../controllers/donasi_controller");
const createMulterStorage = require('../middlewares/upload_file');
const {authenticateUser} = require('../middlewares/authentication');
const {isMiminMaster, isMiminPanti} = require('../middlewares/authorization')

const upload_buktidonasi = createMulterStorage(
    '../uploads/bukti_donasi',                                  //destinasi folder
    1024 * 1024 * 3,                                            //batas ukuran file
    ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf'] //tipe mime file
);

router.post('/tambah', upload_buktidonasi.single('bukti_tanda_terima'),authenticateUser, donasiController.tambah);
router.get('/lihat',authenticateUser, isMiminMaster, donasiController.getList);
router.patch('/verifikasi/:id_donasi', authenticateUser, isMiminMaster, donasiController.verifikasi);
router.get('/riwayatdonasi', authenticateUser, donasiController.riwayatdonasi);
router.patch('/:id_panti/verifikasidonasi/:id_donasi', authenticateUser, isMiminPanti, donasiController.verifikasidonasi);
router.get('/:id_panti/lihatdonasi', authenticateUser, isMiminPanti, donasiController.lihatdonasi);

module.exports = router;
