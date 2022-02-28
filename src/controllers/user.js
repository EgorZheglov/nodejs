const users = require('../database/users');

async function createUser(name, password) {
  const user = {
    name: name,
    password: password,
  };
  await Promise.resolve(users.push(user));
  //TODO: check error, etc

  return user;
}

async function findByName(name) {
  const user = await Promise.resolve(users.find((user) => user.name === name));
  //TODO: check error, etc

  return user;
}

module.exports = { createUser, findByName };
