import { Schema, model } from "mongoose";

const postSchema = new Schema ({
  email: { type: String },
  img: { type: String, default: null },
  post_message: { type: String },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  reported: { type: Boolean, default: false },
}, { timestamps: true });

export const Post = model('Post', postSchema);
