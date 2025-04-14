import { Schema, model } from "mongoose";

const coachSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  age: Number,
  gender: {
    type: String,
    enum: ["male", "female", "dumbell"],
    default: "male",
  },
  verified: { type: Boolean, default: false },
  profileImg: String,
  code: String,
});

export const Coach = model("Coach", coachSchema);