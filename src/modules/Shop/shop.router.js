import { Router } from "express";
import { asyncHandler } from "../../utils/asynchandler.js";
import { getAllshop, addShop,addShopWithGoogle } from "./shop.controller.js";
import { shopSchema, shopWithGoogleSchema } from "./shop.schema.js";
import { validation } from "../../middleware/validation.middleware.js";
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
let shopRouter = Router();
shopRouter.get("/getAllshop", asyncHandler(getAllshop));
shopRouter.post("/addShop", upload.single("profileImg"), validation(shopSchema), asyncHandler(addShop));
shopRouter.post(
  "/addShopWithGoogle",
  upload.single("profileImg"),
  validation(shopWithGoogleSchema),
  asyncHandler(addShopWithGoogle)
);
export default shopRouter;
