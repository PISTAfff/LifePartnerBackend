import { Schema, model } from "mongoose";

const coashSchema = new Schema({
    name : String,
    email: {type: String, unique: true},
    password: String,
    phone: String,
    age: Number,
    gender: {
        type: String,
        enum: ["male", "female", "dumbell"],
        default: "male",
      },
});

export const Coash = model("Coash", coashSchema);