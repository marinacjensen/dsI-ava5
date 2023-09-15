const { sequelize, Sequelize } = require ('../config/database');

const livros = require('../models/livros')(sequelize, Sequelize)
const usuarios = require('../models/usuarios')(sequelize,Sequelize)

exports.index = (req, res) => {
        res.render('index');
    };

exports.registerForm = (req, res) => {
    res.render('registerForm');
};