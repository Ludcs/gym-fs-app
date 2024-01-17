const express = require('express');
const {
  getAllUsers,
  getUserById,
} = require('../controllers/users.controllers');

//instanciar usersRouter
const usersRouter = express.Router();

//Users routes
usersRouter.get('/users', getAllUsers);
usersRouter.get('/users/:id', getUserById);

module.exports = usersRouter;
