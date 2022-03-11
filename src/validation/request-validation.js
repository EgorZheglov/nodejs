const { celebrate, Joi } = require('celebrate');

const validateSignupLogin = celebrate({
  body: Joi.object().keys({
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

const validateEmployeeCreate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    birthdate: Joi.string().min(2).max(30).required(),
    rank: Joi.string().required(),
    salary: Joi.string().required(),
  }),
});

module.exports = {
  validateSignupLogin,
  validateEmployeeCreate,
};
