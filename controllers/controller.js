const {
    sequelize,
    Sequelize
} = require('../config/database');
const bcrypt = require('bcrypt')

const livros = require('../models/livros')(sequelize, Sequelize)
const usuarios = require('../models/usuarios')(sequelize, Sequelize)

exports.index = (req, res) => {
    res.render('index');
};

exports.registerForm = (req, res) => {
    res.render('registerForm');
};

exports.addUser = async (req, res) => {
    const {
        nome,
        email,
        senha
    } = req.body;
    const senha_hashed = await bcrypt.hash(senha, 10)
    await usuarios.create({
        nome,
        email,
        senha_hashed
    });
    res.redirect('/');
}

exports.showUser = (req, res) => {
    res.render('user');
}

exports.showBooks = async (req, res) => {
    const results = await livros.findAll({
        order: [
            ['id', 'ASC']
        ]
    });
    res.render('books', {
        results
    });
};

exports.registerBooks = (req, res) => {
    res.render('registerBooks');
};

exports.addBooks = async (req, res) => {
    const {
        autor,
        titulo,
        ano,
        quantidade
    } = req.body;
    const user = null;
    await livros.create({
        autor,
        titulo,
        ano,
        quantidade,
        user
    });
    res.redirect('/livros');
}

exports.deleta = async (req, res) => {
    const id = req.params.id;
    await livros.destroy({
        where: {
            id
        }
    });
    res.redirect('/livros');
};

exports.edita = async (req, res) => {
    const id = req.params.id;
    const livro = await livros.findByPk(id);
    res.render('editBooks', {
        id,
        livro
    });
};

exports.atualiza = async (req, res) => {
    const id = req.params.id;
    const {
        autor,
        titulo,
        ano,
        quantidade
    } = req.body;
    const user = null;
    await empregados.update({
        autor,
        titulo,
        ano,
        quantidade,
        user
    }, {
        where: {
            id
        }
    });
    res.redirect('/livros');
};