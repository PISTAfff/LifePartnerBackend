import Joi from 'joi';
export const postSchema = Joi.object({
  user: Joi.string().required(),
  img: Joi.string().uri().optional(),
  post_message: Joi.string().min(10).required(),
  likes: Joi.number().min(0).default(0),
  dislikes: Joi.number().min(0).default(0)
});
