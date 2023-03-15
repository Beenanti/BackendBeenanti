const express = require("express");
const router = express.Router();
const pantiController = require("../controllers/panti_controller")

router.get("/list-panti", pantiController.getListPanti);

module.exports = router