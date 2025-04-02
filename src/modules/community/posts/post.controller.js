import { Post } from "../../../../DB/models/community/post.model.js"
import dotenv from "dotenv";
dotenv.config();
import { postSchema } from "./post.schema.js";


export const getAllposts = async (req, res) => {
        const posts = await Post.find({});
        res.status(200).json(posts);
};

export const addPost = async (req, res) => {
    const { error } = postSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
      const { user, img, post_message } = req.body;
      const newPost = new Post({ user,img,post_message}); 
      await newPost.save();
      res.status(201).json({ message: 'Post created successfully', post: newPost });

  };

  
  