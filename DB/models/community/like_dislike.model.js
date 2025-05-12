import { Schema, model } from "mongoose";

const likeDislikeSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  type: { type: String, enum: ["like", "dislike"], required: true },
}, { timestamps: true });

export const LikeDislike = model("LikeDislike", likeDislikeSchema); 