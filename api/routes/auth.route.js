const express = require('express');
const { registerUser, loginUser } = require('../controllers/auth.controller');

//instanciar authRouter
const authRouter = express.Router();

//Auth
authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);

module.exports = authRouter;
