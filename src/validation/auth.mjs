import Joi from 'joi';

export default {
  login: {
    body: {
      email: Joi.string().email()
        .required(),
      password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/)
        .required()
    }
  },
  signup: {
    body: {
      email: Joi.string().email()
        .required(),
      password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/)
        .required(),
      username: Joi.string().regex(/[a-zA-Z0-9]{3,30}/)
        .required()
    }
  }
}
