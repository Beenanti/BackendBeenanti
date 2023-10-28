const express = require("express");
const router = express.Router();
const kebutuhanController = require("../controllers/kebutuhan_controller");
const {authenticateUser} = require('../middlewares/authentication');
const {isMiminMaster, isMiminPanti} = require('../middlewares/authorization');

router.post('/tambah', authenticateUser, isMiminMaster, kebutuhanController.tambahkebutuhan);
router.get('/lihat',authenticateUser, isMiminMaster, kebutuhanController.lihatkebutuhan);
router.patch('/edit/:id_kebutuhan', authenticateUser, isMiminMaster, kebutuhanController.editkebutuhan);
router.delete('/hapus/:id_kebutuhan', authenticateUser, isMiminMaster, kebutuhanController.hapuskebutuhan);
router.post('/:id_panti/tambahkebutuhan', authenticateUser, isMiminPanti, kebutuhanController.tambahkebpanti);
router.get('/:id_panti/lihatkebutuhan', authenticateUser, isMiminPanti, kebutuhanController.lihatkebpanti);
router.patch('/:id_panti/editkebutuhan/:id_kebutuhan', authenticateUser, isMiminPanti, kebutuhanController.editkebpanti);
router.delete('/:id_panti/hapuskebutuhan/:id_kebutuhan', authenticateUser, isMiminPanti, kebutuhanController.hapuskebpanti);

module.exports = router;