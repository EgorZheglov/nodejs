const express = require('express');
const { createUser } = require('../controllers/user');
const router = express.Router();

router.post('/signup', async (req, res, next) => {
  const { name, password } = req.body;

  const user = await createUser(name, password);

  if (user) {
    res.status(200).send('registred');
  } else {
    // throw error next or smth
  }
});

module.exports = router;
