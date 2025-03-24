import { Router } from "express";
import { asyncHandler } from "../../utils/asynchandler.js";
import { validation } from "../../middleware/validation.middleware.js";
import {
  checkEmailInModels,
  checkEmailFromToken,
  changePassword,
} from "./Other.controller.js";
let userRouter = Router();
userRouter.post(
  "/checkEmailToken",
  validation(),
  asyncHandler(checkEmailFromToken)
);
userRouter.post("/checkEmail", validation(), asyncHandler(checkEmailInModels));
userRouter.post("/changePassword", validation(), asyncHandler(changePassword));
