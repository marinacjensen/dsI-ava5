const {
    DataTypes
} = require('sequelize');
const sequelize = require('../config/database');
const livros = require('./livros')(sequelize, sequelize);
const usuario = require('./usuarios')(sequelize, sequelize);
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

User.belongsToMany(livros, {
    through: emprestimo
});
livros.belongsToMany(User, {
    through: emprestimo
});

module.exports = emprestimo;