import { Router } from "express";
import { asyncHandler } from "../../utils/asynchandler.js";
import {
    getAllComments,
    addComment,} from "./comment.controller.js";
import {commentSchema } from "./comment.schema.js";
import { validation } from "../../middleware/validation.middleware.js";
let commentRouter = Router();
commentRouter.get("/getAllComments", asyncHandler(getAllComments));
commentRouter.post("/addComment", validation(commentSchema), asyncHandler(addComment));
export default commentRouter;
