import crypto from "crypto";
import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import { IUserDoc } from "../interfaces/userInterface";

const userSchema = new Schema<IUserDoc>(
  {
    fullname: {
      type: String,
      required: [true, "Please input your name"],
      minLength: [6, "Name must not be less than 6 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: [true, "Email already exists!"],
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid Email"],
    },
    phoneNumber: Number,
    password: {
      type: String,
      required: [true, "Please provide your password"],
      minLength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords are not the same!!",
      },
    },
    passwordChangedAt: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Hash password before save
userSchema.pre<IUserDoc>("save", async function (next) {
  // Skip this midddleware if password is not modified
  if (!this.isModified("password")) return next();
  // Hash password
  this.password = await bcrypt.hash(this.password, 12);
  // Clear passwordConfirm field
  this.passwordConfirm === undefined;
  // If road clear, move on....
  next();
});

userSchema.pre<IUserDoc>("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  // Update password changedAt field anytime password is modified
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

const User = mongoose.model<IUserDoc>("User", userSchema);

export { User };
