import Joi from "joi";

export const commentSchema = Joi.object({
    user: Joi.string().required(),
    comment: Joi.string().min(5).required(),
    post: Joi.string().required()
  });
  