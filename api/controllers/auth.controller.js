const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/User');

//register
const registerUser = async (req, res) => {
  try {
    const { name, lastname, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUserRegister = await User.create({
      name,
      lastname,
      email,
      password: hashedPassword,
    });

    if (email === 'parodia452@gmail.com') {
      await newUserRegister.update({ isAdmin: true });
    }
    return res.status(201).json(newUserRegister);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error al registrar usuario' });
  }
};

//login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({
      where: { email },
    });

    if (!existingUser)
      return res.status(404).json({ message: 'Usuario no encontrado' });

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid)
      return res.status(401).json({ message: 'Password incorrecto' });

    return res.status(200).json({ existingUser, message: 'Login exitoso' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error al hacer login' });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
