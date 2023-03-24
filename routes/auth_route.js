const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth_controller");

router.post("/mobile/register", authController.registerMobile);
router.post("/master/register", authController.registerAdminMaster);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

module.exports = router