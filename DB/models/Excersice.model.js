import { Schema, model } from "mongoose";

const ExcersiceSchema = new Schema({
  name: String,
  howto: String,
  img: String,
  category: [String],
  howTo: String,
});

export const Excersice = model("Excersice", ExcersiceSchema);
