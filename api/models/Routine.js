const { DataTypes } = require('sequelize');
const sequelize = require('../db/dbConfig');

const Routine = sequelize.define('Routine', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  objetive: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  medicalBackground: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  descriptionRoutine: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Routine.associations = (models) => {
  Routine.belongsTo(models.User, { as: 'User', foreignKey: 'userId' });
};

module.exports = Routine;
