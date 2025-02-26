import type { Request } from "express";
import { Types } from "mongoose";
import { IUser } from "../src/models/userModel";

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}

export {};
