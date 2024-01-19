const express = require('express');
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createRoutine,
  getRoutineByUserId,
  updateRoutineByUserId,
} = require('../controllers/users.controllers');

//instanciar usersRouter
const usersRouter = express.Router();

//Users
usersRouter.get('/users', getAllUsers);
usersRouter.get('/users/:id', getUserById);
usersRouter.put('/users/:id', updateUser);
usersRouter.delete('/users/:id', deleteUser);

//Routines
usersRouter.get('/users/routine/:userId', getRoutineByUserId);
usersRouter.post('/users/createRoutine', createRoutine);
usersRouter.put('/users/routine/:userId', updateRoutineByUserId);

module.exports = usersRouter;
