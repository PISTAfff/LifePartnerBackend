import { Schema, model } from "mongoose";

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  age: Number,
  profileImg: String,

  gender: {
    type: String,
    enum: ["male", "female", "dumbell"],
    default: "male",
  },
  code: String,
});

export const User = model("User", userSchema);
