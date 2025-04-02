import { Schema, model } from "mongoose";

const postSchema = new Schema ({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  img: { type: String, default: null },
  post_message: { type: String },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 }
}, { timestamps: true });

export const Post = model('Post', postSchema);
