import express from "express";
import userController from "./../controllers/userController";
import authController from "./../controllers/authController";

const router = express.Router();

// 1. Registration and login
router.post("/signup", authController.signup); // User Registration
router.post("/login", authController.login); // User Login
router.post("/logout", authController.protectRoute, authController.logout); // User Logout

router.get(
  "/all-users",
  authController.protectRoute,
  userController.getAllUsers
);
router.get("/:id/me", authController.protectRoute, userController.getMe);
router.get(
  "/:id/update-me",
  authController.protectRoute,
  userController.updateMe
);

export default router;
