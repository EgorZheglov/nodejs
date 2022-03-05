const employees = require('../database/employees');
const { to } = require('await-to-js');
const { v4: uuid } = require('uuid');
const e = require('express');

async function createEmployee(data) {
  const { name, birthdate, rank, salary } = data;
  const id = uuid();

  await Promise.resolve(employees.push({ name, birthdate, rank, salary, id }));

  return { name, birthdate, rank, salary, id };
}

async function deleteEmployee(id) {
  if (employees.find((el) => el.id === id)) {
    employees.filter((el) => el.id !== id);
    return Promise.resolve('deleted');
  } else {
    throw 'not Found';
  }
}

async function findEmployes() {
  await Promise.resolve({});

  return employees;
}

async function findEmployeeById(id) {
  const [err, employee] = await to(
    Promise.resolve(employees.find((el) => el.id === id))
  );

  if (err) throw err;

  return employee;
}

module.exports = {
  createEmployee,
  findEmployes,
  findEmployeeById,
  deleteEmployee,
};
