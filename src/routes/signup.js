const express = require('express');
const { createUser } = require('../controllers/user');
const { validateSignupLogin } = require('../validation/request-validation');
const { to } = require('await-to-js');
const router = express.Router();

router.post('/signup', validateSignupLogin, async (req, res, next) => {
  const { name, password } = req.body;

  const [err, user] = await to(createUser(name, password));

  if (!err) {
    res.status(200).send({ message: 'registred' });
  } else {
    // throw error next or smth
  }
});

module.exports = router;
