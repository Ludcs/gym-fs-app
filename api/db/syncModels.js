const User = require('../models/User');

async function syncModels() {
  try {
    await User.sync();
    console.log('La tabla para Users se ha creado!!!');
  } catch (error) {
    console.log('Error al sincronizar el modelo User:', error);
  }
}

module.exports = syncModels;
