const express = require('express');
const cookieParser = require('cookie-parser');
const login = require('../src/routes/login');
const auth = require('./middlewares/auth');
const signup = require('./routes/signup');
const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(signup);
app.use(login);

app.use(auth);

app.use((req, res) => {
  res.status(404).send({ message: 'Not Found ' });
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT} port`);
});
