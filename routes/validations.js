const Joi = require("@hapi/joi");

const Registerschema = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).email().required(),
  password: Joi.string().min(6).required(),
});

const Loginschema = Joi.object({
  email: Joi.string().min(6).email().required(),
  password: Joi.string().min(6).required(),
});

validateRegister = (data) => {
  return Registerschema.validate(data)
}
validateLogin = (data) => {
  return Loginschema.validate(data);
};

module.exports = {validateRegister,validateLogin};

//module.exports = validateLogin;
