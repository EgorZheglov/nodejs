const db = require('../database/db');
const { to } = require('await-to-js');

async function createUser(name, password) {
  const user = {
    name: name,
    password: password,
  };
  const [err, result] = await to(
    db.query('insert into agency.users ( name, password ) values ($1, $2)', [
      name,
      password,
    ])
  );

  if (err) {
    throw err;
  }

  return result;
}

async function findByName(name) {
  const [err, result] = await to(
    db.query('select * from agency.users where name = $1', [name])
  );

  if (err || !result.rows || result.rows.length === 0) {
    throw err;
  }

  return result.rows[0];
}

module.exports = { createUser, findByName };
