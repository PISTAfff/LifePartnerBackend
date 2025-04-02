import { Router } from "express";
import { asyncHandler } from "../../utils/asynchandler.js";
import { getAllposts,addPost,} from "./post.controller.js";
import {postSchema } from "./post.schema.js";
import { validation } from "../../middleware/validation.middleware.js";
let postRouter = Router();
postRouter.get("/getAllPosts", asyncHandler(getAllposts));
postRouter.post("/addPost", validation(postSchema), asyncHandler(addPost));
export default postRouter;
