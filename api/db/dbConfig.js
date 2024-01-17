const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('GymDb', 'root', 'esotilin1282', {
  host: 'localhost',
  dialect: 'mysql',
  logging: console.log,
});

module.exports = sequelize;
