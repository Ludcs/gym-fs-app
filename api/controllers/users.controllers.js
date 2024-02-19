const moment = require('moment');
const { Op } = require('sequelize');
const User = require('../models/User');
const Routine = require('../models/Routine');

//USERS
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
      .json({ message: 'Error server al obtener todos los usuarios', error });
  }
};

// const getUserByName = async (req, res) => {
//   const { name, lastname } = req.query;
//   try {
//     const user = await User.findOne({
//       where: {
//         [Op.and]: [
//           {
//             name: {
//               [Op.like]: `%${name}%`, // Case-insensitive search for name
//             },
//           },
//           {
//             lastname: {
//               [Op.like]: `%${lastname}%`, // Case-insensitive search for lastname
//             },
//           },
//         ],
//       },
//     });

//     if (!user)
//       return res.status(404).json({
//         message: 'No se encontró un usuario con ese nombre o apellido',
//       });

//     res.status(200).json(user);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       message: 'Error server al obtener usuario por nombre y apellido',
//       error,
//     });
//   }
// };

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user)
      return res.status(404).json({ message: 'Usuario no encontrado' });

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: 'Error server al obtener un usuario by id' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastname } = req.body;

    //update() devuelve un array con 2 posiciones, la posicion 0 es la cantidad de filas. Si es === 0 es que ninguna fila fue afectada y por ende ningun usuario fue actualizado. Si es === 1 si se actualizo.
    const updatedUserRows = await User.update(
      { name, lastname },
      { where: { id } }
    );

    if (updatedUserRows[0] === 0)
      return res.status(404).json({ message: 'Usuario no encontrado' });

    //recuperar los nuevos datos del usuario que fue actualizado
    const updatedUser = await User.findByPk(id);

    res.status(200).json({ updatedUser, message: 'Usuario actualizado' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error server al actualizar el usuario' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.update(
      { isActive: false },
      { where: { id } }
    );

    //update() devuelve un array con 2 posiciones, la posicion 0 es la cantidad de filas. Si es === 0 es que ninguna fila fue afectada y por ende ningun usuario fue actualizado. Si es === 1 si se actualizo.
    if (deletedUser[0] === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario desactivado correctamente' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error server al desactivar el usuario' });
  }
};

//ROUTINES
const getAllRoutines = async (req, res) => {
  try {
    const routines = await Routine.findAll();
    if (!routines || routines.length === 0)
      return res.status(404).json({ message: 'No se encontraron las rutinas' });
    res.status(200).json(routines);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Error server al obtener todas las rutinas', error });
  }
};

const createRoutine = async (req, res) => {
  try {
    const {
      name,
      lastname,
      objetive,
      medicalBackground,
      startDate,
      descriptionRoutine,
    } = req.body;
    console.log(req.body);

    const { id } = req.params;

    const parsedStartDate = moment(startDate, 'DD/MM/YYYY', true);
    if (!parsedStartDate.isValid())
      return res.status(400).json({ message: 'Formato de fecha inválido' });

    const formattedStartDate = parsedStartDate.toISOString();

    const newRoutine = await Routine.create({
      name,
      lastname,
      objetive,
      medicalBackground,
      startDate: formattedStartDate,
      descriptionRoutine,
      userId: id,
    });

    res
      .status(201)
      .json({ newRoutine, message: 'Routine was created successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error server al crear la rutina' });
  }
};

const getRoutineByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);

    const userRoutine = await Routine.findOne({
      where: { userId },
    });

    if (!userRoutine)
      return res
        .status(404)
        .json({ message: 'No se encontró la rutina para este usuario' });

    res.status(200).json(userRoutine);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error server al intentar obtener la rutina de este usuario',
    });
  }
};

const updateRoutineByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log('userId:', userId);
    const { objetive, medicalBackground, startDate, descriptionRoutine } =
      req.body;
    const updatedRoutineRows = await Routine.update(
      { objetive, medicalBackground, startDate, descriptionRoutine },
      { where: { userId } }
    );

    if (updatedRoutineRows[0] === 0)
      return res.status(404).json({ message: 'Rutina no encontrada' });

    const updatedRoutine = await Routine.findOne({ where: { userId } });
    res.status(200).json(updatedRoutine);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error server al actualizar la rutina de este usuario',
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getAllRoutines,
  createRoutine,
  getRoutineByUserId,
  updateRoutineByUserId,
};
