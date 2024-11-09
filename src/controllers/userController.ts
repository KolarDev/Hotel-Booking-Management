const User = require("./../models/userModel");
const AppError = require("./../utils/appError");

// Get all Users
const getAllUsers = async (req, res, next) => {
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
const getMe = async (req, res, next) => {
  const userId = (req.user._id = req.params.id);
  const user = await User.findById(userId);
  if (!user) next(new AppError("User not found!", 404));

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
};

// Update User Profile details
const updateMe = async (req, res, next) => {
  const { fullname, email, phoneNumber } = req.body;
  const userId = (req.user._id = req.params.id);
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
};

exports default {
  getAllUsers,
  getMe,
  updateMe,
};
