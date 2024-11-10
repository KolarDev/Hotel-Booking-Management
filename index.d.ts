import * as express from "express-serve-static-core";
import { IUser } from "./src/models/userModel";

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // To be used for req.user for authentication
    }
  }
}
