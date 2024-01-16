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
//!Sarasa2

module.exports = {
  registerUser,
  loginUser,
};
