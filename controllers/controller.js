const { sequelize, Sequelize } = require('../config/database');

exports.index = (req, res) => {
        res.render('index');
    };