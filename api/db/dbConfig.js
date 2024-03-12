const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.NAMEDB,
  process.env.USERNAMEDB,
  process.env.PASSDBCONFIG,
  {
    host: process.env.HOST,
    dialect: 'mysql',
    port: process.env.DBPORT,
    logging: console.log,
  }
);

module.exports = sequelize;
