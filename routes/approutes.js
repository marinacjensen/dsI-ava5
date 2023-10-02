const express = require("express");
const router = express.Router();
var controller = require("../controllers/controller");


router.get("/", controller.index);
router.get("/registro", controller.registerForm);
router.post("/registro", controller.addUser);
router.get("/usuario", controller.showUser);
router.get("/livros", controller.showBooks);
router.get("/registroLivros", controller.registerBooks);
router.post("/registroLivros", controller.addBooks);
router.get("/deleta/:id", controller.deleta);
router.get("/edita/:id", controller.edita);
router.post("/edita/:id", controller.atualiza);

module.exports = router;