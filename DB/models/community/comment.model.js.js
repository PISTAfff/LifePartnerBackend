import { Schema, model } from "mongoose";

const commentSchema = new Schema(
    {
        comment: String,
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    },{ timestamps: true });

export const Comment = model("Comment", commentSchema);