import { Router } from "express";
import { asyncHandler } from "../../utils/asynchandler.js";
import { getAllUsers, addUser } from "./user.controller.js";
import { UserSchema } from "./user.schema.js";
import { validation } from "../../middleware/validation.middleware.js";
let userRouter = Router();
userRouter.get("/getAllUsers", asyncHandler(getAllUsers));
userRouter.post("/createUser", asyncHandler(addUser), validation(UserSchema));
export default userRouter;
