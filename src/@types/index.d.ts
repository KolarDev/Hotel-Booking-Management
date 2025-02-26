import type { Request } from "express";
import { Types } from "mongoose";
import { IUser } from "../models/User";

interface User {
  _id: Types.ObjectId;
  fullname: string;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
