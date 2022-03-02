const { findByName } = require('../controllers/user');
const { to } = require('await-to-js');
const jwt = require('jsonwebtoken');

module.exports = async function login(name, password) {
  const [err, response] = await to(findByName(name));

  if (err) {
    throw err;
  }

  if (response.password !== password) {
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
