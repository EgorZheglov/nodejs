const { start, stop } = require('../src/app');
const axios = require('axios');
const db = require('../src/database/db');
//const { describe, beforeAll, afterAll, test } = require('jest');

describe('global test for all routes', () => {
  const port = 8000;
  const path = `http://localhost:${port}`;
  let authorizationHeaders;
  let employeeId;

  const testUser = {
    name: `teste2e`,
    password: '12345',
  };

  const testEmployee = {
    name: 'test',
    birthdate: '1984.06.06',
    rank: 'test',
    salary: 1000,
  };

  beforeAll(async () => {
    await start(port);
  });

  afterAll(async () => {
    await db.query('DELETE FROM "agency"."users" WHERE name = $1', [
      testUser.name,
    ]);
    await stop();
  });

  test('signup & login routes', async () => {
    const responseFromSignup = await axios.post(`${path}/signup`, {
      name: testUser.name,
      password: testUser.password,
    });

    expect(responseFromSignup.status).toBe(200);
    expect(responseFromSignup.data.message).toBe('registred');

    const responseFromLogin = await axios.post(`${path}/login`, {
      name: testUser.name,
      password: testUser.password,
    });

    authorizationHeaders = {
      headers: { Authorization: `Bearer ${responseFromLogin.data}` },
    };
    expect(responseFromLogin.status).toBe(200);
    expect(responseFromLogin.data).toBeTruthy();
    expect(responseFromLogin.data.length).toBeGreaterThan(0);
  });

  test('Should create employee', async () => {
    const responseFromCreate = await axios.post(
      `${path}/employee`,
      {
        name: testEmployee.name,
        birthdate: testEmployee.birthdate,
        rank: testEmployee.rank,
        salary: testEmployee.salary,
      },
      authorizationHeaders
    );

    expect(responseFromCreate.status).toBe(200);
  });

  test('Should get employees', async () => {
    const responseFromGetAll = await axios.get(
      `${path}/employee`,
      authorizationHeaders
    );

    employeeId = responseFromGetAll.data[0].id;
    expect(responseFromGetAll.status).toBe(200);
    expect(responseFromGetAll.data.length).toBeGreaterThan(0);
    expect(
      responseFromGetAll.data.some((el) => el.id === employeeId)
    ).toBeTruthy();
  });

  test('Should get employee by id', async () => {
    const responseFromGetById = await axios.get(
      `${path}/employee/${employeeId}`,
      authorizationHeaders
    );

    expect(responseFromGetById.status).toBe(200);
    expect(responseFromGetById.data.name).toEqual(testEmployee.name);
    expect(responseFromGetById.data.birthdate).toEqual(testEmployee.birthdate);
    expect(responseFromGetById.data.rank).toEqual(testEmployee.rank);
    expect(responseFromGetById.data.salary).toEqual(testEmployee.salary);
  });

  test('Should delete employee by id', async () => {
    const responseFromDelete = await axios.delete(
      `${path}/employee/${employeeId}`,
      authorizationHeaders
    );

    expect(responseFromDelete.status).toBe(201);
  });
});
