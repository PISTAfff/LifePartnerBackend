import Joi from 'joi';
export const coachSchema = Joi.object({
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(30).required(),
  phone: Joi.string().min(3).max(30).required(),
  age: Joi.number().required(),
  gender: Joi.string().required(),
});
export const coachSchemaWithGoogle = Joi.object({

  phone: Joi.string().min(3).max(30).required(),
  age: Joi.number().required(),
  gender: Joi.string().required(),
});
  