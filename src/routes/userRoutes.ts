import express from "express";
import * as userController from "./../controllers/userController";
import * as authController from "./../controllers/authController";

const router = express.Router();

// 1. Registration and login
router.post("/signup", authController.signup); // User Registration
router.post("/login", authController.login); // User Login

//Protect all the routes below
router.use( authController.protectRoute);

router.post("/logout", authController.logout); // User Logout

router.get(
  "/all-users",
  userController.getAllUsers
);
router.get("/:id/me", userController.getMe);
router.get(
  "/:id/update-me",
  userController.updateMe
);

export default router;
