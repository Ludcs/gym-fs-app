require('dotenv').config();
const express = require('express');
const cors = require('cors');
const AuthRouter = require('./routes/auth.route');
const dbConnection = require('./db/dbConnection');

//executables
const app = express();
const port = process.env.PORT;
//db connection
dbConnection();
//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use('/auth', AuthRouter);
//app.use('/routine', )

//listen on
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
