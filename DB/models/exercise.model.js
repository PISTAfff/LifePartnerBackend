import { Schema, model } from "mongoose";

const exerciseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: [String],
      required: true,
    },
    howTo: {
      type: String,
      required: true,
    },
    mediaUrl: {
      type: String,
      required: true,
    },
    mediaType: {
      type: String,
      enum: ["image", "video"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Exercise = model("Exercise", exerciseSchema); 