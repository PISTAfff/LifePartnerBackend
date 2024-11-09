import { mongoose } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const dbConnect = async () => {
  await mongoose
    .connect(process.env.CONNECTION_URL)
    .then(() => {
      console.log("MongoDb Connected Successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};
