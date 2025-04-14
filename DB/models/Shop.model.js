import { Schema, model } from "mongoose";

const shopSchema = new Schema({
  name: String,
  address: [String],
  email: { type: String, unique: true },
  password: String,
  phone: String,
  profileImg: String,

  verified: { type: Boolean, default: false },
  code: String,
});

export const Shop = model("Shop", shopSchema);