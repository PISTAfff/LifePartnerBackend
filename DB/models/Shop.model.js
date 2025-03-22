import { Schema, model } from "mongoose";

const shopSchema = new Schema({
    name : String,
    email: {type: String, unique: true},
    password: String,
    phone: String,
    age: Number
});

export const Shop = model("Shop", shopSchema);