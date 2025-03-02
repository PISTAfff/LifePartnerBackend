import { Router } from "express";
import { asyncHandler } from "../../utils/asynchandler.js";
import { getAllUsers, addUser,getUser } from "./user.controller.js";
import { UserSchema,getUserSchema } from "./user.schema.js";
import { validation } from "../../middleware/validation.middleware.js";
let userRouter = Router();
userRouter.get("/getAllUsers", asyncHandler(getAllUsers));
userRouter.get("/getUser", validation(getUserSchema), asyncHandler(getUser));
userRouter.post("/createUser", validation(UserSchema), asyncHandler(addUser));
export default userRouter;
