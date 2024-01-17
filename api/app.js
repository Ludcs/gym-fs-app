require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbConnection = require('./db/dbConnection');
const syncModels = require('./db/syncModels');
const authRouter = require('./routes/auth.route');
const usersRouter = require('./routes/users.route');

//executables
const app = express();
const port = process.env.PORT;
//db connection
dbConnection();
//syncs
syncModels();
//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use('/auth', authRouter);
app.use('/', usersRouter);

//listen on
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
