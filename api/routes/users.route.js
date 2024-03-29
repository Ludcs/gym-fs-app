const express = require('express');
const {
  getAllUsers,
  getUserById,
  updateUser,
  reactiveUser,
  inactiveUser,
  getAllRoutines,
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
usersRouter.put('/users/reactive/:id', reactiveUser);
usersRouter.delete('/users/:id', inactiveUser);

//Routines
usersRouter.get('/routines/all', getAllRoutines);
usersRouter.get('/users/routine/:userId', getRoutineByUserId);
usersRouter.post('/users/createRoutine/:id', createRoutine);
usersRouter.put('/users/updateRoutine/:userId', updateRoutineByUserId);

module.exports = usersRouter;
