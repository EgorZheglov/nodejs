const express = require('express');
const login = require('../common/login');
const router = express.Router();

router.post('/login', async (req, res, next) => {
  const { name, password } = req.body;

  const token = await login(name, password);

  if (token) {
    res.status(200).send(token);
  } else {
    //TODO: upgrade statuses/messages
    res.status(400).send('error');
  }
});

module.exports = router;
