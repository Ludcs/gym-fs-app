//register
const registerUser = (req, res) => {
  res.json({
    message: 'registerUser',
  });
};

//login
const loginUser = (req, res) => {
  res.json({ message: 'loginUser' });
};

//Sarasa

module.exports = {
  registerUser,
  loginUser,
};
