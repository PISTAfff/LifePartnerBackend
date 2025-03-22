import Joi from "joi";

export const GymSchema = Joi.object({
    Name: Joi.string().min(1).max(50).required(),
    Address: Joi.array().items(Joi.string().min(1).required()).required(),
    phone: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    GymStuffShopLink: Joi.string().uri().optional(),
    website: Joi.string().uri().optional(),
    workingHours: Joi.object({
      start: Joi.string().required(),
      end: Joi.string().required() }).required(),
    images: Joi.array().items(Joi.string().uri().required()).optional(),
    password: Joi.string().min(8).required()
  });
  
  export const getGymSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(30).required(),
  });
  

  

  
  
  
  