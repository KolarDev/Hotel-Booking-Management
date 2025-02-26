import crypto from "crypto";
import { Schema, Document, Types, model } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  fullname: string;
  email: string;
  password: string;
  role: string;
  passwordConfirm: string;
  passwordChangedAt: Date;
}

export interface IUserJSON extends Document {
  fullname: string;
  email: string;
  passwordChangedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    fullname: {
      type: String,
      required: [true, "Please input your name"],
      minLength: [6, "Name must not be less than 6 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid Email"],
    },
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
      role: {
        type: String,
        enum: ["user", "admin"],
        required: true,
        default: "user",
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
userSchema.pre<IUser>("save", async function (next) {
  // Skip this midddleware if password is not modified
  if (!this.isModified("password")) return next();
  // Hash password
  this.password = await bcrypt.hash(this.password, 12);
  // Clear passwordConfirm field
  this.passwordConfirm === undefined;
  // If road clear, move on....
  next();
});

userSchema.pre<IUser>("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  // Update password changedAt field anytime password is modified
  this.passwordChangedAt = new Date(Date.now() - 1000);
  next();
});

const User = model<IUser>("User", userSchema);

export { User };
