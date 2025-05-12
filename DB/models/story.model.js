import { Schema, model } from "mongoose";

const StorySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  mediaUrl: { type: String, required: true },
  mediaType: { type: String, enum: ["photo", "video"], required: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
});

export const Story = model("Story", StorySchema); 