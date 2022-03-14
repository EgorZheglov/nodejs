const employees = require('../database/employees');
const db = require('../database/db');
const { to } = require('await-to-js');
const { v4: uuid } = require('uuid');

async function createEmployee(data) {
  const { name, birthdate, rank, salary } = data;
  const id = uuid();

  const [err, result] = await to(
    db.query(
      'insert into agency.employee ( name, birthdate, rank, salary ) values ($1, $2, $3, $4)',
      [name, birthdate, rank, salary]
    )
  );

  if (err) {
    throw 'user not created';
  }

  return 'created';
}

async function deleteEmployee(id) {
  const [err, result] = await to(
    db.query('delete from agency.employee where id = $1', [id])
  );

  if (err) {
    throw err;
  }

  return 'deleted';
}

async function findEmployes() {
  const [err, result] = await to(db.query('select * from agency.employee'));

  if (err) {
    throw err;
  }

  return result.rows;
}

async function findEmployeeById(id) {
  const [err, result] = await to(
    db.query('select * from agency.employee where id = $1', [id])
  );

  if (err) throw err;

  return result.rows[0];
}

module.exports = {
  createEmployee,
  findEmployes,
  findEmployeeById,
  deleteEmployee,
};
