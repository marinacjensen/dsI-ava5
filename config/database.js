const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  database: 'marina',
  username: 'root',
  password: 'mysqluser',
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = {
  Sequelize,
  sequelize
};