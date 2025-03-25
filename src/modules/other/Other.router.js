import { Router } from "express";
import { asyncHandler } from "../../utils/asynchandler.js";
import { validation } from "../../middleware/validation.middleware.js";
import {
  checkEmailInModels,
  checkEmailFromToken,
  changePassword,
  sendCode,
  loginWithGoogle,
  login,
} from "./Other.controller.js";
import { EmailSchema, EmailandPasswordSchema } from "./Other.schema.js";
let otherRouter = Router();
otherRouter.get("/checkEmailToken", asyncHandler(checkEmailFromToken));
otherRouter.post(
  "/checkEmail",
  validation(EmailSchema),
  asyncHandler(checkEmailInModels)
);
otherRouter.post(
  "/changePassword",
  validation(EmailSchema),
  asyncHandler(changePassword)
);
otherRouter.post(
  "/sendVerCode",
  validation(EmailSchema),
  asyncHandler(sendCode)
);
otherRouter.get("/loginWithGoogle", asyncHandler(loginWithGoogle));
otherRouter.post(
  "/login",
  validation(EmailandPasswordSchema),
  asyncHandler(login)
);
export default otherRouter;
