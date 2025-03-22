import { Schema, model } from "mongoose";

const GymSchema = new Schema({
  Name: String,
  Address: [String],
  phone: String,
  email: { type: String, unique: true },
  GymStuffShopLink: String,
  website: String,
  workingHours: {
    start: String,
    end: String,},
  images: [String],
  password: String,
});

export const Gym = model("Gym", GymSchema);
