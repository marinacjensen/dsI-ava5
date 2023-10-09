const {
    DataTypes
} = require('sequelize');
const { sequelize, Sequelize } = require('../config/database');
const livros = require('./livros')(sequelize, Sequelize);
const usuario = require('./usuarios')(sequelize, Sequelize);
const emprestimo = sequelize.define('emprestimo', {
    usuario: {
        type: DataTypes.INTEGER,
        unique: false,
        references: {
            model: usuario,
            key: 'id'
        }
    },
    livro: {
        type: DataTypes.INTEGER,
        unique: false,
        references: {
            model: livros,
            key: 'id'
        }
    }
});

usuario.belongsToMany(livros, {
    through: emprestimo
});
livros.belongsToMany(usuario, {
    through: emprestimo
});

module.exports = emprestimo;