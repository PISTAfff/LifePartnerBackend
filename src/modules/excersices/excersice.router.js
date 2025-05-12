import { Router } from "express";
import multer from "multer";
import { asyncHandler } from "../../utils/asynchandler.js";
import { validation } from "../../middleware/validation.middleware.js";
import {
  getAllExcersises,
  addExcersice,
  deleteExcersiceByName,
} from "./excersice.controller.js";
import { ExcersiceSchema } from "./excersice.schema.js";
import Joi from "joi";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage });
let ExcersiceRouter = Router();
ExcersiceRouter.post(
  "/deleteExcersice",
  validation(
    Joi.object({
      name: Joi.string().min(1).max(50).required(),
    })
  ),
  asyncHandler(deleteExcersiceByName)
);
ExcersiceRouter.get("/getAllExcersices", asyncHandler(getAllExcersises));
ExcersiceRouter.post(
  "/addExcersice",
  upload.single("img"),
  validation(ExcersiceSchema),
  asyncHandler(addExcersice)
);

export default ExcersiceRouter;
