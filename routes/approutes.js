const express = require("express");
const router = express.Router();
var controller = require("../controllers/controller");


router.get("/", controller.index);
router.get("/registro", controller.registerForm);

module.exports = router;