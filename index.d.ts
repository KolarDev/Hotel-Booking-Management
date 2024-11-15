import * as express from "express";
import { IUser } from "./src/models/userModel";

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
      env: string; // To be used for req.user for authentication
    }
  }
}
