const Routine = require('../models/Routine');
const User = require('../models/User');

async function syncModels() {
  try {
    await User.sync({ alter: true });
    await Routine.sync({ alter: true });
    console.log('Sync OK');
  } catch (error) {
    console.log('Sync Error:', error);
  }
}

module.exports = syncModels;
