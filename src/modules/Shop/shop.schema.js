import Joi from "joi";
export const shopSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(30).required(),
  name: Joi.string().min(1).max(50).required(),
  address: Joi.string().min(3).max(30).required(),
  phone: Joi.string().min(11).max(11).required(),
});
export const shopWithGoogleSchema = Joi.object({
  name: Joi.string().min(1).max(50).required(),
  address: Joi.string().min(3).max(30).required(),
  phone: Joi.string().min(11).max(11).required(),
});
