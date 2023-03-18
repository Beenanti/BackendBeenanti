const express = require("express");
const router = express.Router();
const pantiController = require("../controllers/panti_controller")

router.post("/register-mimin-panti", pantiController.registerAdminPanti);
router.get("/list-panti", pantiController.getListPanti);

module.exports = router