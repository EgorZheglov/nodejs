const express = require('express');
const { to } = require('await-to-js');
const {
  createEmployee,
  deleteEmployee,
  findEmployes,
  findEmployeeById,
} = require('../controllers/employee');

const router = express.Router();

router.post('/employee', async (req, res, next) => {
  const data = req.body;

  const employee = await createEmployee(data);

  if (employee) {
    res.status(200).send(employee);
  } else {
    // throw error next or smth
  }
});

router.get('/employee', async (req, res, next) => {
  const { name = '', limit = 10 } = req.query;

  const employees = await findEmployes();

  if (employees) {
    res.status(200).send(employees);
  } else {
    // throw error next or smth
  }
});

router.get('/employee/:id', async (req, res, next) => {
  const id = req.params.id;

  const employee = await findEmployeeById(id);

  if (employee) {
    res.status(200).send(employee);
  } else {
    // throw error next or smth
  }
});

router.delete('/employee/:id', async (req, res, next) => {
  const id = req.params.id;

  console.log(id);
  const [err, employee] = await to(deleteEmployee(id));

  if (employee) {
    res.status(201).send('deleted');
  } else {
    // throw error next or smth
    res.status(404).send();
  }
});

module.exports = router;
