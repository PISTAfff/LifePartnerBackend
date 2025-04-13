import { Router } from "express";
import { asyncHandler } from "../../utils/asynchandler.js";
import {
  getAllUsers,
  addUser,
  addUserWithGoogle,
} from "./user.controller.js";
import {
  UserSchema,
  UserSchemaToken,
} from "./user.schema.js";
import { validation } from "../../middleware/validation.middleware.js";

let userRouter = Router();
userRouter.get("/getAllUsers", asyncHandler(getAllUsers));
userRouter.post("/createUser", validation(UserSchema), asyncHandler(addUser));
userRouter.post(
  "/createUserWithGoogle",
  validation(UserSchemaToken),
  asyncHandler(addUserWithGoogle)
);
export default userRouter;
//localhost:3000/user/getAllUsers