import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, unique: true },
  email: String,
  age: Number,
  password: String,
});

export const User = model("User", userSchema);
