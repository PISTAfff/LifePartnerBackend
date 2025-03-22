export const shopSchema = Joi.object({
    name : Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(30).required(),
    phone: Joi.string().min(3).max(30).required(),
    age: Joi.number().required(),
    gender: Joi.string().required(),
  });
  
  export const getshopSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(30).required(),
  });
  

  