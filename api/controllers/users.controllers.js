const User = require('../models/User');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    if (!users || users.length === 0)
      return res
        .status(404)
        .json({ message: 'No se encontraron los usuarios' });

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Error al obtener todos los usuarios', error });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user)
      return res.status(404).json({ message: 'Usuario no encontrado' });

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al obtener un usuario by id' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
};
