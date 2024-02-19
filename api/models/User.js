const { DataTypes } = require('sequelize');
const sequelize = require('../db/dbConfig');

const User = sequelize.define('User', {
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

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Puedes establecer el valor predeterminado según tus necesidades
  },

  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

User.associations = (models) => {
  User.hasOne(models.Routine, { as: 'currentRoutine', foreignKey: 'userId' });
  User.hasMany(models.Routine, { as: 'adminRoutines', foreignKey: 'adminId' });
};

module.exports = User;
