import { Document } from "mongoose";

export interface IUserDoc extends Document {
  fullname: string;
  email: string;
  phoneNumber: string;
  password?: string;
  passwordConfirm?: string;
  passwordChangedAt: Date;
}
