import { Schema, model } from "mongoose";

const userNewSchema=new Schema({
    username: String,
    password: String,
    Email: String,
    isMale: Boolean,
    age:Number,
});
    
export const UserNew = model("UserNew", userNewSchema);
    