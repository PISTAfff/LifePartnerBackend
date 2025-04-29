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
  checkCode,
  verifyAccount,
  getAllUnverifiedEmails,
  loginAdmin,
  deleteAccount,
  addEmailToNewsletter
} from "./Other.controller.js";
import {
  EmailSchema,
  EmailandPasswordSchema,
  CodeSchema,
  UserNameandPasswordSchema,
} from "./Other.schema.js";
let otherRouter = Router();
otherRouter.get("/checkEmailToken", asyncHandler(checkEmailFromToken));
otherRouter.post(
  "/checkEmail",
  validation(EmailSchema),
  asyncHandler(checkEmailInModels)
);
otherRouter.post(
  "/changePassword",
  validation(EmailandPasswordSchema),
  asyncHandler(changePassword)
);
otherRouter.post("/addToNewsletter", validation(EmailSchema), asyncHandler(addEmailToNewsletter));
otherRouter.post("/sendCode", validation(EmailSchema), asyncHandler(sendCode));
otherRouter.get("/loginWithGoogle", asyncHandler(loginWithGoogle));
otherRouter.post(
  "/login",
  validation(EmailandPasswordSchema),
  asyncHandler(login)
);
otherRouter.post(
  "/verifyAccount",
  validation(EmailSchema),
  asyncHandler(verifyAccount)
);
otherRouter.post(
  "/deleteAccount",
  validation(EmailSchema),
  asyncHandler(deleteAccount)
);
otherRouter.post(
  "/loginAdmin",
  validation(UserNameandPasswordSchema),
  asyncHandler(loginAdmin)
);
otherRouter.get("/uptime", (req, res) => res.status(200).json("OK"));

otherRouter.get("/getAllUnverifiedEmails", asyncHandler(getAllUnverifiedEmails));
otherRouter.post("/checkCode", validation(CodeSchema), asyncHandler(checkCode));
export default otherRouter;
