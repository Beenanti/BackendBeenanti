const express = require("express");
const router = express.Router();
const karyaController = require("../controllers/karya_controller");
const createMulterStorage = require('../middlewares/upload_file');
const {authenticateUser} = require('../middlewares/authentication');
const {isMiminMaster, isMiminPanti} = require('../middlewares/authorization')


const upload_gambar = createMulterStorage(
    '../uploads/karya',                                  //destinasi folder
    1024 * 1024 * 5,                                            //batas ukuran file
    ['image/png', 'image/jpg', 'image/jpeg'] //tipe mime file
);

router.post('/:id_panti/tambah', upload_gambar.array('url_gambar', 10),authenticateUser, karyaController.tambahkarya);
router.get('/lihat/:id_panti', karyaController.lihatkarya);
router.patch('/:id_panti/edit/:id_karya', authenticateUser, karyaController.editkarya);
router.delete('/:id_panti/hapus/:id_karya', authenticateUser, karyaController.hapuskarya);

module.exports = router;