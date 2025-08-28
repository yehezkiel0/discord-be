import express from "express";
import { storageUserPhoto } from "../utils/multer";
import multer from "multer";
import * as userController from "../controllers/userController";

const userRoutes = express.Router();

const uploadPhoto = multer({
  storage: storageUserPhoto,
  fileFilter(req, file, callback) {
    if (file.mimetype.startsWith("image/")) {
      callback(null, true);
    } else {
      callback(new Error("Only image files are allowed"));
    }
  },
});

userRoutes.post(
  "/auth/sign-up",
  uploadPhoto.single("photo"),
  userController.signUp
);

userRoutes.post("/auth/sign-in", userController.signIn);

export default userRoutes;
