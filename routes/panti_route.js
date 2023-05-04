const express = require("express");
const router = express.Router();
const pantiController = require("../controllers/panti_controller");
const {authenticateUser} = require('../middlewares/authentication');

router.get('/', pantiController.getList);
router.get('/jenis-status', pantiController.statusJenisPanti);
router.get('/kelola', authenticateUser, pantiController.lihatDataDikelola);
router.get('/cari', pantiController.cari);
router.get('/riwayat/:id_panti', pantiController.riwayatVerifikasi);
router.get('/:id_panti', pantiController.detail);
router.post('/tambah', pantiController.tambah);
router.patch('/edit/:id_panti', pantiController.edit);
router.patch('/kelola/edit/:id_panti', authenticateUser, pantiController.editDataDikelola);

module.exports = router;