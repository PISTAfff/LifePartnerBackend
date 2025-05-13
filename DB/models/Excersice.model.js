import { Schema, model } from "mongoose";

const ExcersiceSchema = new Schema({
  name: String,
  desc: String,
  proTip: String,
  img: String,
  video: String,
  category: [String],
  instructions: [String],
});

export const Excersice = model("Excersice", ExcersiceSchema);
