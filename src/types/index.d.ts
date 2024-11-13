import * as express from "express-serve-static-core";
import { IUser } from "../models/userModel";

declare global {
  namespace Express {
    interface Request {
      user: IUser; // To be used for req.user for authentication
    }
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ; // To be used for req.user for authentication
    }
  }
}
