import { Schema, model } from "mongoose";

const newsLetterSchema = new Schema({
  email: { type: String, unique: true },
});

export const newsLetter = model("newsLetter", newsLetterSchema);
