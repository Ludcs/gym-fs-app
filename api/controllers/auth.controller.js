const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
// const cookie = require('cookie');
const User = require('../models/User');

//register
const registerUser = async (req, res) => {
  try {
    const { name, lastname, email, password } = req.body;

    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'Este usuario ya esta registrado' });
    }

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

    const token = jwt.sign({ id: existingUser.id }, process.env.SECRETJWT);

    // const cookieOptions = {
    //   httpOnly: true,
    //   maxAge: 60 * 60 * 24 * 7, // 1 week
    //   sameSite: 'strict',
    //   path: '/',
    // };

    // res.setHeader(
    //   'Set-cookie',
    //   cookie.serialize('token', token, cookieOptions),
    //   cookie.serialize('userId', existingUser.id.toString(), cookieOptions),
    //   cookie.serialize(
    //     'isAdmin',
    //     existingUser.isAdmin.toString(),
    //     cookieOptions
    //   ),
    //   cookie.serialize(
    //     'userName',
    //     `${existingUser.name} ${existingUser.lastname}`,
    //     cookieOptions
    //   )
    // );

    return res.status(200).json({
      userId: existingUser.id,
      isAdmin: existingUser.isAdmin,
      userName: `${existingUser.name} ${existingUser.lastname}`,
      token,
      message: 'Login exitoso',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error al hacer login' });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
