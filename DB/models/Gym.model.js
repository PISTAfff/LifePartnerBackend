import { Schema, model } from "mongoose";

const GymSchema = new Schema({
  name: String,
  address: [String],
  phone: String,
  email: { type: String, unique: true },
  gymStuffShopLink: String,
  website: String,
  workingHours: {
    start: String,
    end: String,},
  images: [String],
  password: String,
  verified: { type: Boolean, default: false },
});

export const Gym = model("Gym", GymSchema);
