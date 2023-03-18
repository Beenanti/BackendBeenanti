const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth_controller");

router.post("/register-mobile", authController.registerMobile);
router.post("/register-mimin-master", authController.registerAdminMaster);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

module.exports = router