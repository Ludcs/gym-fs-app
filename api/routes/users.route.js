const express = require('express');
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createRoutine,
  getRoutineByUserId,
} = require('../controllers/users.controllers');

//instanciar usersRouter
const usersRouter = express.Router();

//Users
usersRouter.get('/users', getAllUsers);
usersRouter.get('/users/:id', getUserById);
usersRouter.put('/users/:id', updateUser);
usersRouter.delete('/users/:id', deleteUser);

//Routines
usersRouter.post('/users/createRoutine', createRoutine);
usersRouter.get('/users/routine/:userId', getRoutineByUserId);

module.exports = usersRouter;
