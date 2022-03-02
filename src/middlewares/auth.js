const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return res.status(403).send('Error authorization token');
  }

  jwt.verify(
    authorizationHeader.split(' ')[1],
    'notVeryGoodSecret',
    (err, decoded) => {
      if (err) {
        res.status(403).send('token invalid');
      } else {
        next();
      }
    }
  );
};
