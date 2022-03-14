const db = require('./db');

module.exports = async () => {
  await db.query('create schema if not exists agency');
  await db.query(`create table if not exists agency.users (
      id serial primary key, 
      name varchar(50) not null, 
      password varchar not null
      );`);
  await db.query(`create table if not exists agency.employee (
      id serial primary key, 
      name varchar(50) not null, 
      birthdate varchar(50) not null, 
      rank varchar(50) not null,
      salary integer not null
      );`);
};
