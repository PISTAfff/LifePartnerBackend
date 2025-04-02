import {Comment} from "../../../../DB/models/community/comment.model.js"
import dotenv from "dotenv";
dotenv.config();
import { commentSchema } from "./comment.schema.js";

export const getAllComments = async (req, res) => {
        const comments = await Comment.find({});
        res.status(200).json(comments);
};

export const addComment = async (req, res) => {
    const { error } = commentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { user, comment, post } = req.body;
      const newComment = new Comment({user,comment,post});
      await newComment.save();
      res.status(201).json(newComment);
  };
  