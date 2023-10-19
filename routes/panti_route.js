const express = require("express");
const router = express.Router();
const pantiController = require("../controllers/panti_controller");
const {authenticateUser} = require('../middlewares/authentication');
const {isMiminMaster, isMiminPanti} = require('../middlewares/authorization')
const createMulterStorage = require('../middlewares/upload_file')

const upload_galeri = createMulterStorage(
    '../uploads/galeri',                            //folder destinasi
    1024 * 1024 * 3,                            //batas ukuran file dalam bytes
    ['image/png', 'image/jpg', 'image/jpeg']    //tipe mime file
);

router.get('/', pantiController.getList);
router.get('/cari', pantiController.cari);
router.get('/kelola', authenticateUser, isMiminPanti, pantiController.lihatDataDikelola);
router.get('/riwayat/:id_panti', authenticateUser, pantiController.riwayatVerifikasi);
router.get('/:id_panti', pantiController.detail);
router.post('/tambah', authenticateUser, pantiController.tambah);
router.post('/:id_panti/galeri', authenticateUser, upload_galeri.array('foto', 10), pantiController.uploadGaleri);
router.patch('/edit/:id_panti', authenticateUser, isMiminMaster, pantiController.edit);
router.patch('/kelola/edit/:id_panti', authenticateUser, isMiminPanti, pantiController.editDataDikelola);

module.exports = router;