import { Router } from "express";
import { asyncHandler } from "../../utils/asynchandler.js";
import {
  getAllUsers,
  addUser,
  getUser,
  sendCode,
  addUserWithGoogle,
} from "./user.controller.js";
import { UserSchema, getUserSchema, EmailSchema } from "./user.schema.js";
import { validation } from "../../middleware/validation.middleware.js";
let userRouter = Router();
userRouter.get("/getAllUsers", asyncHandler(getAllUsers));
userRouter.post("/getUser", validation(getUserSchema), asyncHandler(getUser));
userRouter.post("/createUser", validation(UserSchema), asyncHandler(addUser));
userRouter.post("/createUserWithGoogle", validation(UserSchema), asyncHandler(addUserWithGoogle));
userRouter.post("/sendVerCode", validation(EmailSchema), asyncHandler(sendCode));
userRouter.put("/updateUser/:id",validation(updateUserSchema), asyncHandler(updateUser));
export default userRouter;
