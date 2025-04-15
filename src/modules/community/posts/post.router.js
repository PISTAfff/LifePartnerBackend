import { Router } from "express";
import { asyncHandler } from "../../../utils/asynchandler.js";
import { getAllposts, addPost, addPostWithImage, reportPost, getAllReportedPosts, deletePost, } from "./post.controller.js";
import {postSchema, reportSchema } from "./post.schema.js";
import { validation } from "../../../middleware/validation.middleware.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage });
let postRouter = Router();
postRouter.post("/deletePost",validation(reportSchema), asyncHandler(deletePost));
postRouter.post(
  "/reportPost",
  validation(reportSchema),
  asyncHandler(reportPost)
);
postRouter.get("/getAllReportedPosts", asyncHandler(getAllReportedPosts));
postRouter.get("/getAllPosts", asyncHandler(getAllposts));
postRouter.post("/addPost", validation(postSchema), asyncHandler(addPost));
postRouter.post(
  "/addPostWithImage",
  upload.single("img"),
  validation(postSchema),
  asyncHandler(addPostWithImage)
);
export default postRouter;
