import * as express from "express-serve-static-core";
import { Types } from "mongoose";
import { IUser } from "./../models/userModel";

declare module "express-serve-static-core" {
  // namespace Express {
    interface Request {
      user: IUser;
    }
  //}
}

export {};