const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('GymDb', 'root', process.env.PASSDBCONFIG, {
  host: 'localhost',
  dialect: 'mysql',
  logging: console.log,
});

module.exports = sequelize;
