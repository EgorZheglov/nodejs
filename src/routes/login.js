const express = require('express');
const { validateSignupLogin } = require('../validation/request-validation');
const login = require('../common/login');
const { to } = require('await-to-js');
const router = express.Router();

router.post('/login', validateSignupLogin, async (req, res, next) => {
  const { name, password } = req.body;

  const [err, token] = await to(login(name, password));

  if (token) {
    res.status(200).send(token);
  } else {
    //TODO: upgrade statuses/messages
    res.status(500).send('wrong login or password');
  }
});

module.exports = router;
