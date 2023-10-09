const express = require("express");
const router = express.Router();
var controller = require('../controllers/controller')


router.get("/", controller.index);
router.get("/registro", controller.registerForm);
router.post("/registro", controller.addUser);
router.post("/auth", controller.authUser);
router.get("/user", controller.showUser);
router.get("/booksUser", controller.booksUser);
router.get("/booksAno", controller.booksYear);
router.get("/logout", controller.logout);
router.get("/busca", controller.busca);
router.get("/aluga/:id", controller.aluga);
router.get("/livrosAdmin", controller.showBooks);
router.get("/registroLivros", controller.registerBooks);
router.post("/registroLivros", controller.addBooks);
router.get("/deleta/:id", controller.deleta);
router.get("/edita/:id", controller.edita);
router.post("/edita/:id", controller.atualiza);

module.exports = router;