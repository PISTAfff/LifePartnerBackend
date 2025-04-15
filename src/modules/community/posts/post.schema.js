import Joi from 'joi';
export const postSchema = Joi.object({
  email: Joi.string().email().required(),
  post_message: Joi.string().min(10).required(),
  likes: Joi.number().min(0).default(0).optional(),
  dislikes: Joi.number().min(0).default(0).optional(),
});
export const reportSchema = Joi.object({
  postId: Joi.string().required(),
});