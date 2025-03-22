import { dbConnect } from "./DB/connection.js";
import userRouter from "./src/modules/user/user.router.js";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
const port = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);

await dbConnect();
app.listen(port, () => console.log(`Server is running on port ${port}`));
