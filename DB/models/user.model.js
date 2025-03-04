import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
});

export const User = model("User", userSchema);
