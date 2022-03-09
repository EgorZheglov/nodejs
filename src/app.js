const express = require('express');
const { errors } = require('celebrate');
const employee = require('../src/routes/employee');
const cookieParser = require('cookie-parser');
const login = require('../src/routes/login');
const auth = require('./middlewares/auth');
const signup = require('./routes/signup');
const errHandler = require('../src/common/express-err-handler');

let server;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(signup);
app.use(login);

app.use(auth); //auth middleware

app.use(employee);

app.use(errors({ statusCode: 400, message: 'validation failed' }));
app.use((req, res) => {
  res.status(404).send({ message: 'route not found' });
});

module.exports = {
  start: async (PORT = 3000) => {
    //await connect to db
    server = app.listen(PORT, () => {
      console.log(`Server is listening on ${PORT} port`);
    });
  },
  stop: async () => {
    //await disconnect from db
    server.close();
  },
};
