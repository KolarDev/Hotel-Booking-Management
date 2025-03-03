import { User } from "./../models/userModel";
import { NextFunction, Request, Response } from "express";
import AppError from "./../utils/appError";

// Get all Users
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  const users = await User.find();
  if (!users) next(new AppError("Users not found!", 404));

  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
};

// Get User Profile details
const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) next(new AppError("User not found!", 404));

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(200).json({
      status: "Failed!",
      message: "Error fetching user !",
    });
    console.log(error);
  }
};

// Update User Profile details
const updateMe = async (req: Request, res: Response, next: NextFunction) => {
  
  if (!req.user) {
    return next(new AppError("Unauthorized access!", 401));
  }

  try {
    const { fullname, email, phoneNumber } = req.body;
    const userId = req.user._id;
    const user = await User.findByIdAndUpdate(userId, {
      fullname,
      email,
      phoneNumber,
    });
    if (!user) next(new AppError("User not found!", 404));

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(200).json({
      status: "Failed!",
      message: "Error updating user !",
    });
    console.log(error);
  }
};

export { getAllUsers, getMe, updateMe };
