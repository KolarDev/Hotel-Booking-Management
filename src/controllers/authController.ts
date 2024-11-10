import { promisify } from "util";
import { NextFunction, Request, Response } from "express-serve-static-core";
import User from "./../models/userModel";
import AppError from "./../utils/appError";
import jwt from "jsonwebtoken";
import Email from "../utils/notificator";

// Registering user account
const signup = async (req: Request, res: Response, next: NextFunction) => {
  const { fullname, email, phoneNumber, password, passwordConfirm } = req.body;

  const newUser = await User.create({
    fullname,
    email,
    phoneNumber,
    password,
    passwordConfirm,
  });

  sendToken(newUser, 201, res);
};

// Logging user in
const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Provide your username and password!!", 401));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new AppError("Invalid Credentials!!", 401));
  }

  sendToken(user, 200, res);
};

// Logout
const logout = (req: Request, res: Response, next: NextFunction) => {
  // Token invalidation logic goes here (e.g., using a blacklist)
  res.cookie("jwt", "loggedout", {
    expiresIn: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully.",
  });
};

// Protect route to be accessed by only loggedIn users
const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 1. Get the token from the authorization header
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  // Check if there is no token. which means the user is not logged in
  if (!token) return next(new AppError("Please login to get access!", 401));

  // 2. Verifying the token. Server verifies by test signature
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3. Check if user still exists
  const confirmUser = await User.findById(decoded.id);
  if (!confirmUser) {
    return next(
      new AppError("Authentication Failed!, Try logging in again", 401)
    );
  }

  // 4. Save the confirm user in as req.user for use in the protected route.
  req.user = confirmUser;
  // Road clear!! Move on...
  next();
};

// Password Update Functionality. Logged in users changing password
const updatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 1. Get the logged in user from collection
  const user = await User.findById(req.user.id).select("+password");

  // 2. Check if the user's current password is correct
  if (!(await user.checkPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError("Incorrect Current Password!", 401));
  }

  // 3. If current password is correct, Update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  // 4. Log the user in. Send jwt
  sendToken(user, 200, res);
};

const generateToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const sendToken = (user: any, statusCode: number, res: Response) => {
  const token = generateToken(user._id);
  console.log(token);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie("jwt", token, cookieOptions);

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

export { signup, login, logout, protectRoute, updatePassword, sendToken };
