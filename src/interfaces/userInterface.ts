import { Document } from "mongoose";

export interface IUser extends Document {
  fullname: string;
  email: string;
  phoneNumber: string;
  password?: string;
  passwordConfirm?: string;
  passwordChangedAt: Date;
}
