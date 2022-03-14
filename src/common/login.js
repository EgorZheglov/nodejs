const { findByName } = require('../controllers/user');
const { to } = require('await-to-js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = async function login(name, password) {
  const [err, response] = await to(findByName(name));

  if (err || !response) {
    throw err;
  }

  const match = await bcrypt.compare(password, response.password);

  if (!match) {
    throw 'wrong password';
  }

  const accessToken = jwt.sign(
    {
      name: name,
    },
    'notVeryGoodSecret',
    { expiresIn: '600s' }
  );

  return accessToken;
};
