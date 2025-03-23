import Joi from "joi";
export const UserSchema = Joi.object({
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(30).required(),
  phone: Joi.string().min(3).max(30).required(),
  age: Joi.number().required(),
  gender: Joi.string().required(),
});
export const getUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(30).required(),
});
export const EmailSchema = Joi.object({
  email: Joi.string().email().required()
});
export const updateUserSchema = Joi.object({
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(30).required(),
  phone: Joi.string().min(3).max(30).required(),
  age: Joi.number().required(),
  gender: Joi.string().required(),
});


