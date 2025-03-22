import { Schema, model } from "mongoose";

const StaffSchema = new Schema({
    name : String,
    email: {type: String, unique: true},
    password: String,
    phone: String,
    age: Number
});

export const Staff = model("Staff", StaffSchema);