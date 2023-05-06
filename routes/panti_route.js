const express = require("express");
const router = express.Router();
const pantiController = require("../controllers/panti_controller");
const {authenticateUser} = require('../middlewares/authentication');
const {isMiminMaster, isMiminPanti} = require('../middlewares/authorization')

router.get('/', pantiController.getList);
router.get('/cari', pantiController.cari);
router.get('/jenis-status', authenticateUser, pantiController.statusJenisPanti);
router.get('/kelola', authenticateUser, isMiminPanti, pantiController.lihatDataDikelola);
router.get('/riwayat/:id_panti', authenticateUser, pantiController.riwayatVerifikasi);
router.get('/:id_panti', pantiController.detail);
router.post('/tambah', authenticateUser, pantiController.tambah);
router.patch('/edit/:id_panti', authenticateUser, isMiminMaster, pantiController.edit);
router.patch('/kelola/edit/:id_panti', authenticateUser, isMiminPanti, pantiController.editDataDikelola);

module.exports = router;